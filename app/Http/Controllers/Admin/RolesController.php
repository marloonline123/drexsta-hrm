<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Role;
use App\Models\Permission;

class RolesController extends Controller
{
    /**
     * Display the roles management page.
     */
    public function index()
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        $roles = $company ? Role::where('company_id', $company->id)
            ->with('permissions', 'users')
            ->paginate(12) : [];
            
        $rolesCollection = $roles ? RoleResource::collection($roles) : [];

        // Also fetch permissions for the frontend
        $permissions = $company ? Permission::where('company_id', $company->id)->get() : [];
        
        // Group permissions by name pattern (e.g., users.view, users.create)
        $groupedPermissions = [];
        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $category = $parts[0] ?? 'general';
            $action = $parts[1] ?? $permission->name;
            
            if (!isset($groupedPermissions[$category])) {
                $groupedPermissions[$category] = [];
            }
            
            $groupedPermissions[$category][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'category' => $category,
                'action' => $action,
            ];
        }

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $rolesCollection,
            'permissions' => $groupedPermissions
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(RoleRequest $request)
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        $data = $request->validated();
        
        $role = Role::create([
            'name' => $data['name'],
            'guard_name' => 'web',
            'company_id' => $company->id,
        ]);
        
        if (isset($data['permissions'])) {
            $permissions = Permission::where('company_id', $company->id)
                ->whereIn('id', $data['permissions'])
                ->get();
            $role->syncPermissions($permissions);
        }

        return back()->with('success', 'Role created successfully');
    }

    /**
     * Update the specified role.
     */
    public function update(RoleRequest $request, Role $role)
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        // Ensure the role belongs to the current company
        if ($role->company_id !== $company->id) {
            return back()->with('error', 'Unauthorized access to role');
        }
        
        $data = $request->validated();
        
        $role->update([
            'name' => $data['name'],
        ]);
        
        if (isset($data['permissions'])) {
            $permissions = Permission::where('company_id', $company->id)
                ->whereIn('id', $data['permissions'])
                ->get();
            $role->syncPermissions($permissions);
        }

        return back()->with('success', 'Role updated successfully');
    }

    /**
     * Remove the specified role.
     */
    public function destroy(Role $role)
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        if (!$company) {
            return back()->with('error', 'No active company found');
        }
        
        // Ensure the role belongs to the current company
        if ($role->company_id !== $company->id) {
            return back()->with('error', 'Unauthorized access to role');
        }
        
        // Check if role has users assigned
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role with assigned users');
        }

        $role->delete();

        return back()->with('success', 'Role deleted successfully');
    }

    /**
     * Get all available permissions for the current company.
     */
    public function permissions()
    {
        $user = Auth::user();
        $company = $user->activeCompany();
        
        if (!$company) {
            return response()->json(['permissions' => []]);
        }
        
        $permissions = Permission::where('company_id', $company->id)->get();
        
        // Group permissions by name pattern (e.g., users.view, users.create)
        $groupedPermissions = [];
        foreach ($permissions as $permission) {
            $parts = explode('.', $permission->name);
            $category = $parts[0] ?? 'general';
            $action = $parts[1] ?? $permission->name;
            
            if (!isset($groupedPermissions[$category])) {
                $groupedPermissions[$category] = [];
            }
            
            $groupedPermissions[$category][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'category' => $category,
                'action' => $action,
            ];
        }

        return response()->json([
            'permissions' => $groupedPermissions
        ]);
    }
}