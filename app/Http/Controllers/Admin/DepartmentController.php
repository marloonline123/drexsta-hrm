<?php

namespace App\Http\Controllers\Admin;

use App\Events\DepartmentCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentRequest;
use App\Http\Resources\Admin\DepartmentResource;
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
        $company = $user->activeCompany();
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
        // Mock department data based on ID
        $department = [
            'id' => (int) $department->id,
            'name' => 'Human Resources',
            'slug' => 'human-resources',
            'description' => 'Manages employee relations, recruitment, and organizational development',
            'is_active' => true,
            'annual_budget' => 150000,
            'manager' => [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@company.com',
                'avatar' => null,
                'position' => 'HR Director'
            ],
            'employee_count' => 12,
            'created_at' => '2024-01-15T00:00:00Z',
            'updated_at' => '2024-02-10T00:00:00Z'
        ];

        $employees = [
            ['id' => 1, 'name' => 'Sarah Johnson', 'email' => 'sarah.johnson@company.com', 'position' => 'HR Director', 'role' => 'manager'],
            ['id' => 7, 'name' => 'Alice Cooper', 'email' => 'alice.cooper@company.com', 'position' => 'HR Specialist', 'role' => 'employee'],
            ['id' => 8, 'name' => 'Bob Wilson', 'email' => 'bob.wilson@company.com', 'position' => 'Recruiter', 'role' => 'employee'],
            ['id' => 9, 'name' => 'Carol Davis', 'email' => 'carol.davis@company.com', 'position' => 'HR Assistant', 'role' => 'employee']
        ];

        return Inertia::render('Admin/Departments/Show', [
            'department' => $department,
            'employees' => $employees
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        // Mock department data for editing
        $department = [
            'id' => (int) $department->id,
            'name' => 'Human Resources',
            'slug' => 'human-resources',
            'description' => 'Manages employee relations, recruitment, and organizational development',
            'is_active' => true,
            'annual_budget' => 150000,
            'manager' => [
                'id' => 1,
                'name' => 'Sarah Johnson',
                'email' => 'sarah.johnson@company.com',
                'avatar' => null
            ]
        ];

        $employees = [
            ['id' => 1, 'name' => 'Sarah Johnson', 'email' => 'sarah.johnson@company.com', 'position' => 'HR Director'],
            ['id' => 2, 'name' => 'Michael Chen', 'email' => 'michael.chen@company.com', 'position' => 'Engineering Lead'],
            ['id' => 3, 'name' => 'Emily Rodriguez', 'email' => 'emily.rodriguez@company.com', 'position' => 'Sales Director'],
            ['id' => 4, 'name' => 'David Kim', 'email' => 'david.kim@company.com', 'position' => 'Finance Manager'],
            ['id' => 5, 'name' => 'Jessica Wang', 'email' => 'jessica.wang@company.com', 'position' => 'Operations Manager'],
            ['id' => 6, 'name' => 'Robert Taylor', 'email' => 'robert.taylor@company.com', 'position' => 'Product Manager']
        ];

        return Inertia::render('Admin/Departments/Edit', [
            'department' => $department,
            'employees' => $employees
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $data = $request->validated();
        $department->update($data);

        event(new DepartmentCreated($department));

        return redirect()->route('dashboard.departments.edit', )->with('success', 'Department Updated successfully.');
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
