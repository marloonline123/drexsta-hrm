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
            'employees.assign-roles', 'employees.assign-abilities', 'employees.assign-job-titles',
            'employees.assign-departments',

            // Job Titles Management
            'job-titles.view', 'job-titles.create', 'job-titles.edit', 'job-titles.delete',

            // Departments Management
            'departments.view', 'departments.create', 'departments.edit', 'departments.delete',

            // Holidays Management
            'holidays.view', 'holidays.create', 'holidays.edit', 'holidays.delete',

            // Leaves Management
            'leaves.view', 'leaves.create', 'leaves.edit', 'leaves.delete',

            // Leave Types Management
            'leave-types.view', 'leave-types.create', 'leave-types.edit', 'leave-types.delete',

            // Employment Types Management
            'employment-types.view', 'employment-types.create', 'employment-types.edit', 'employment-types.delete',

            // Job Postings Management
            'job-postings.view', 'job-postings.create', 'job-postings.edit', 'job-postings.delete',

            // Job Requesitions Management
            'job-requisitions.view', 'job-requisitions.create', 'job-requisitions.edit', 'job-requisitions.delete',

            // Abilities Management
            'abilities.view', 'abilities.create', 'abilities.edit', 'abilities.delete',

            // Approval Policies Management
            'approval-policies.edit',

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

        $adminRole    = Role::firstOrCreate(array_merge(['name' => 'super-admin', 'label' => 'Super Admin'], $roleData));
        $hrRole       = Role::firstOrCreate(array_merge(['name' => 'hr-manager', 'label' => 'HR Manager'], $roleData));
        $financeRole  = Role::firstOrCreate(array_merge(['name' => 'finance-manager', 'label' => 'Finance Manager'], $roleData));
        $employeeRole = Role::firstOrCreate(array_merge(['name' => 'employee', 'label' => 'Employee'], $roleData));

        // Assign permissions
        $adminRole->syncPermissions($permissions);

        $hrRole->syncPermissions($this->filterPermissions($permissions, [
            'users.view','users.create','users.edit','users.delete',
            'employees.view','employees.create','employees.edit','employees.delete',
            'attendance.view','attendance.manage','reports.view', 'employees.assign-roles',
            'roles.view','roles.create','roles.edit','roles.delete', 'job-titles.view','job-titles.create',
            'job-titles.edit','job-titles.delete', 'departments.view','departments.create','departments.edit',
            'departments.delete', 'holidays.view','holidays.create','holidays.edit', 'holidays.delete',
            'leaves.view','leaves.create','leaves.edit','leaves.delete', 'leave-types.view','leave-types.create',
            'leave-types.edit','leave-types.delete', 'employment-types.view','employment-types.create',
            'employment-types.edit','employment-types.delete', 'job-postings.view','job-postings.create',
            'job-postings.edit','job-postings.delete', 'job-requisitions.view','job-requisitions.create',
            'job-requisitions.edit','job-requisitions.delete', 'abilities.view','abilities.create','abilities.edit',
            'abilities.delete', 'approval-policies.edit',
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
