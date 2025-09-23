<?php

namespace App\Http\Controllers\Admin;

use App\Events\DepartmentCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Http\Resources\Admin\DepartmentResource;
use App\Http\Resources\UserResource;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        $departments = $company?->departments()
            ->with('managerRelation', 'employees')
            ->search(request('search'), ['name', 'description'])
            ->filterBy('departments.is_active', request()->has('status') ? request('status') === 'active' : null)
            ->latest()
            ->paginate(12)
            ->withQueryString() ?? [];

        $activeDepartmentsCount = $company?->departments()->active()->count();
        $departments = DepartmentResource::collection($departments)->additional(['meta' => ['employees_count' => $company?->employees()->count(), 'active_departments_count' => $activeDepartmentsCount]]);

        return Inertia::render('Admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $employees = $user->activeCompany()?->users()->get() ?? [];

        return Inertia::render('Admin/Departments/Create', [
            'employees' => $employees
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepartmentRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['slug'] = generateSlug($data['name']);
        $data['company_id'] = $user->active_company_id;
        $department = Department::create($data);
        $department->employees()->attach($data['manager_id'], ['role' => 'manager', 'company_id' => $user->active_company_id, 'created_at' => now(), 'updated_at' => now()]);

        event(new DepartmentCreated($department));
        
        return redirect()->route('dashboard.departments.index')->with('success', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        $department->load('managerRelation', 'employees');
        return Inertia::render('Admin/Departments/Show', [
            'department' => (new DepartmentResource($department))->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        $user = Auth::user();
        $department->load('managerRelation', 'employees');
        $employees = $user->activeCompany()?->users()->get() ?? [];

        return Inertia::render('Admin/Departments/Edit', [
            'department' => (new DepartmentResource($department))->resolve(),
            'employees' => UserResource::collection($employees)->resolve()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DepartmentRequest $request, Department $department)
    {
        $data = $request->validated();
        $department->fill($data);
        if ($department->isDirty('manager_id')) {
            // Remove old manager only
            $department->employees()
            ->wherePivot('role', 'manager')
            ->detach();
            
            // Attach the new manager
            $department->employees()->syncWithoutDetaching([
                $data['manager_id'] => [
                    'role' => 'manager',
                    'company_id' => $department->company_id,
                    'updated_at' => now(),
                ],
            ]);
        }
        $department->save();
        event(new DepartmentCreated($department));

        return back()->with('success', 'Department Updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();

        return redirect()->route('dashboard.departments.index')->with('success', 'Department deleted successfully.');
    }
}
