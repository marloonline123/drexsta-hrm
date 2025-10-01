<?php

namespace App\Http\Controllers\Dashboard\Employee;

use App\Events\EmployeeCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EmployeesResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $company = $user->activeCompany()->with('employees')->first();
        
        $employees = $company->employees()
            ->with('roles', 'permissions')
            ->search(request('search'), 'name')
            ->paginate(12)
            ->withQueryString();
            
        $employeesCollection = EmployeeResource::collection($employees);

        return Inertia::render('Dashboard/Employees/Index', [
            'employees' => $employeesCollection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Employees/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $user = Auth::user();
        $company = $user->activeCompany;
        
        $data = $request->validated();
        
        $employee = User::create([
            'name' => $data['name'],
            'username' => $this->generateUsername($data['name']),
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make('password$'),
            'active_company_id' => $company->id,
        ]);
        
        // Attach the employee to the company
        $company->users()->attach($employee->id, ['role' => 'employee']);

        event(new EmployeeCreated($employee));

        return redirect()->route('dashboard.employees.index')->with('success', 'Employee created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $employee)
    {
        // $this->authorize('view', $employee);
        
        $employee->load('roles', 'permissions', 'abilities', 'activeCompany', 'departments', 'jobTitles');
        return Inertia::render('Dashboard/Employees/Show', [
            'employee' => (new EmployeeResource($employee))->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $employee)
    {
        // $this->authorize('update', $employee);
        
        $employee->load('roles', 'permissions', 'abilities', 'activeCompany', 'departments', 'jobTitles');
        
        return Inertia::render('Dashboard/Employees/Edit', [
            'employee' => (new EmployeeResource($employee))->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, User $employee)
    {
        // $this->authorize('update', $employee);
        
        $data = $request->validated();
        
        $employee->update($data);

        return redirect()->back()->with('success', 'Employee updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employee)
    {
        // $this->authorize('delete', $employee);
        
        $employee->delete();

        return redirect()->route('dashboard.employees.index')->with('success', 'Employee deleted successfully');
    }

    /**
     * Generate a unique username from the employee name.
     */
    private function generateUsername($name)
    {
        $username = strtolower(str_replace(' ', '.', $name));
        $count = User::where('username', 'like', $username . '%')->count();

        if ($count > 0) {
            $username .= '.' . ($count + 1);
        }

        return $username;
    }
}