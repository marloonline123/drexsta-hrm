<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all companies
        $companies = Company::all();
        
        // If no companies exist, create permissions without company_id
        if ($companies->isEmpty()) {
            $this->createPermissionsAndRoles();
            return;
        }
        
        // Create permissions and roles for each company
        foreach ($companies as $company) {
            $this->createPermissionsAndRoles($company->id);
        }
    }
    
    /**
     * Create permissions and roles for a specific company or globally if no company_id provided.
     */
    private function createPermissionsAndRoles(?int $companyId = null): void
    {
        // Define permissions
        $permissions = [
            // User Management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            
            // Role Management
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            
            // Company Management
            'companies.view',
            'companies.create',
            'companies.edit',
            'companies.delete',
            
            // Employee Management
            'employees.view',
            'employees.create',
            'employees.edit',
            'employees.delete',
            
            // Attendance Management
            'attendance.view',
            'attendance.manage',
            
            // Payroll Management
            'payroll.view',
            'payroll.manage',
            
            // Reports & Analytics
            'reports.view',
            'reports.create',
            
            // System Settings
            'settings.view',
            'settings.manage',
        ];

        // Create permissions
        $createdPermissions = [];
        foreach ($permissions as $permission) {
            $permissionData = [
                'name' => $permission,
                'guard_name' => 'web'
            ];
            
            if ($companyId) {
                $permissionData['company_id'] = $companyId;
            }
            
            $createdPermission = Permission::firstOrCreate(
                $permissionData,
                ['created_at' => now(), 'updated_at' => now()]
            );
            
            $createdPermissions[] = $createdPermission;
        }

        // Create default roles
        $roleData = ['guard_name' => 'web'];
        if ($companyId) {
            $roleData['company_id'] = $companyId;
        }
        
        $adminRole = Role::firstOrCreate(
            array_merge(['name' => 'Super Admin'], $roleData)
        );
        $hrRole = Role::firstOrCreate(
            array_merge(['name' => 'HR Manager'], $roleData)
        );
        $financeRole = Role::firstOrCreate(
            array_merge(['name' => 'Finance Manager'], $roleData)
        );
        $employeeRole = Role::firstOrCreate(
            array_merge(['name' => 'Employee'], $roleData)
        );

        // Assign all permissions to Super Admin
        $adminRole->syncPermissions($createdPermissions);

        // Assign specific permissions to HR Manager
        $hrPermissionNames = [
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'employees.view',
            'employees.create',
            'employees.edit',
            'employees.delete',
            'attendance.view',
            'attendance.manage',
            'reports.view'
        ];
        $hrPermissions = collect($createdPermissions)->filter(
            fn($permission) => in_array($permission->name, $hrPermissionNames)
        )->values();
        $hrRole->syncPermissions($hrPermissions);

        // Assign specific permissions to Finance Manager
        $financePermissionNames = [
            'payroll.view',
            'payroll.manage',
            'reports.view',
            'reports.create'
        ];
        $financePermissions = collect($createdPermissions)->filter(
            fn($permission) => in_array($permission->name, $financePermissionNames)
        )->values();
        $financeRole->syncPermissions($financePermissions);

        // Assign basic permissions to Employee
        $employeePermissionNames = [
            'employees.view',
            'attendance.view'
        ];
        $employeePermissions = collect($createdPermissions)->filter(
            fn($permission) => in_array($permission->name, $employeePermissionNames)
        )->values();
        $employeeRole->syncPermissions($employeePermissions);
    }
}