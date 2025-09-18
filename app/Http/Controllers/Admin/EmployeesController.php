<?php

namespace App\Http\Controllers\Admin;

use App\Events\EmployeeCreated;
use App\Exports\EmployeesExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\Admin\EmployeeResource;
use App\Imports\EmployeesImport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class EmployeesController extends Controller
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

        return Inertia::render('Admin/Employees/Index', [
            'employees' => $employeesCollection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Employees/Create');
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
        $company->users()->attach($employee->id, ['role' => 'employee', 'created_at' => now(), 'updated_at' => now()]);

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
        
        return Inertia::render('Admin/Employees/Show', [
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
        
        return Inertia::render('Admin/Employees/Edit', [
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
     * Show the form for updating the password.
     */
    public function updatePassword(Request $request, User $employee)
    {
        $validated = $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $employee->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully');
    }

    /**
     * Show the assign roles form.
     */
    public function showAssignRoles(User $employee)
    {
        // $this->authorize('update', $employee);
        
        $user = Auth::user();
        $company = $user->activeCompany;
        
        $employee->load('roles', 'permissions');
        
        // Get all roles for the current company
        $roles = $company->roles()->get();

        return Inertia::render('Admin/Employees/AssignRoles', [
            'employee' => (new EmployeeResource($employee))->resolve(),
            'roles' => $roles,
        ]);
    }

    /**
     * Show the assign abilities form.
     */
    public function showAssignAbilities(User $employee)
    {
        // $this->authorize('update', $employee);
        
        $user = Auth::user();
        $company = $user->activeCompany;
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        $employee->load('roles', 'permissions');
        
        // Get all abilities for the current company
        $abilities = $company->abilities()->get();

        return Inertia::render('Admin/Employees/AssignAbilities', [
            'employee' => (new EmployeeResource($employee))->resolve(),
            'abilities' => $abilities,
        ]);
    }

    /**
     * Assign roles to the employee.
     */
    public function assignRoles(Request $request, User $employee)
    {
        // $this->authorize('update', $employee);
        // dd($request->all());
        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
        ]);
        
        $user = Auth::user();
        $company = $user->activeCompany;
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        // Get roles that belong to the current company
        $roles = $company->roles()->whereIn('id', $request->input('roles', []))->get();
        
        $employee->syncRoles($roles);

        return redirect()->route('dashboard.employees.edit', $employee)->with('success', 'Roles assigned successfully');
    }

    /**
     * Assign abilities to the employee.
     */
    public function assignAbilities(Request $request, User $employee)
    {
        // $this->authorize('update', $employee);
        
        $request->validate([
            'abilities' => 'array',
            'abilities.*' => 'exists:abilities,id',
        ]);
        
        $user = Auth::user();
        $company = $user->activeCompany;
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        // Get abilities that belong to the current company
        $abilityIds = $company->abilities()->whereIn('id', $request->input('abilities', []))->pluck('id');
        
        // Sync abilities through the ability assignments table
        $employee->abilities()->wherePivot('company_id', $company->id)->detach();
        foreach ($abilityIds as $abilityId) {
            $employee->abilities()->attach($abilityId, ['company_id' => $company->id]);
        }

        return redirect()->route('dashboard.employees.edit', $employee)->with('success', 'Abilities assigned successfully');
    }

    /**
     * Export employees to Excel.
     */
    public function export()
    {
        return Excel::download(new EmployeesExport, 'employees.xlsx');
    }

    /**
     * Import employees from Excel.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new EmployeesImport, $request->file('file'));

        return back()->with('success', 'Employees imported successfully');
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