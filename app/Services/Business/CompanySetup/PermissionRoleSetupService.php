<?php

namespace App\Services\Business\CompanySetup;

use App\Models\Permission;
use App\Models\Role;

class PermissionRoleSetupService
{
    public function setupForCompany(int $companyId): void
    {
        $permissions = $this->getDefaultPermissions();
        $createdPermissions = $this->createPermissions($permissions, $companyId);

        $this->createRolesAndAssignPermissions($createdPermissions, $companyId);
    }

    private function getDefaultPermissions(): array
    {
        return [
            // User Management
            'users.view', 'users.create', 'users.edit', 'users.delete',
            // Role Management
            'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
            // Company Management
            'companies.view', 'companies.create', 'companies.edit', 'companies.delete',
            // Employee Management
            'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
            // Attendance
            'attendance.view', 'attendance.manage',
            // Payroll
            'payroll.view', 'payroll.manage',
            // Reports
            'reports.view', 'reports.create',
            // Settings
            'settings.view', 'settings.manage',
        ];
    }

    private function createPermissions(array $permissions, ?int $companyId): array
    {
        $created = [];

        foreach ($permissions as $permission) {
            $data = [
                'name' => $permission,
                'guard_name' => 'web',
                'company_id' => $companyId,
            ];

            $created[] = Permission::firstOrCreate(
                ['name' => $permission, 'company_id' => $companyId],
                $data
            );
        }

        return $created;
    }

    private function createRolesAndAssignPermissions(array $permissions, ?int $companyId): void
    {
        $roleData = ['guard_name' => 'web', 'company_id' => $companyId];

        $adminRole    = Role::firstOrCreate(array_merge(['name' => 'Super Admin'], $roleData));
        $hrRole       = Role::firstOrCreate(array_merge(['name' => 'HR Manager'], $roleData));
        $financeRole  = Role::firstOrCreate(array_merge(['name' => 'Finance Manager'], $roleData));
        $employeeRole = Role::firstOrCreate(array_merge(['name' => 'Employee'], $roleData));

        // Assign permissions
        $adminRole->syncPermissions($permissions);

        $hrRole->syncPermissions($this->filterPermissions($permissions, [
            'users.view','users.create','users.edit','users.delete',
            'employees.view','employees.create','employees.edit','employees.delete',
            'attendance.view','attendance.manage','reports.view'
        ]));

        $financeRole->syncPermissions($this->filterPermissions($permissions, [
            'payroll.view','payroll.manage','reports.view','reports.create'
        ]));

        $employeeRole->syncPermissions($this->filterPermissions($permissions, [
            'employees.view','attendance.view'
        ]));
    }

    private function filterPermissions(array $permissions, array $names)
    {
        return collect($permissions)->filter(fn($p) => in_array($p->name, $names))->values();
    }
}
