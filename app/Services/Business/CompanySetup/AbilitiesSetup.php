<?php

namespace App\Services\Business\CompanySetup;

use App\Models\Ability;

class AbilitiesSetup
{
    public function setupForCompany(int $companyId): void
    {
        // Create default abilities
        $abilities = [
            [
                'company_id' => $companyId,
                'key' => 'department_head',
                'label' => 'Department Head',
                'description' => 'Can approve department-related actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'hr_manager',
                'label' => 'HR Manager',
                'description' => 'Can approve HR-related actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'finance_approver',
                'label' => 'Finance Approver',
                'description' => 'Can approve financial actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'ceo',
                'label' => 'CEO',
                'description' => 'Can approve high-level actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'team_lead',
                'label' => 'Team Lead',
                'description' => 'Can approve team-related actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'hiring_manager',
                'label' => 'Hiring Manager',
                'description' => 'Can approve hiring related actions'
            ],
            [
                'company_id' => $companyId,
                'key' => 'recruiter',
                'label' => 'Recruiter',
                'description' => 'Can approve recruiting related actions'
            ]
        ];

        foreach ($abilities as $abilityData) {
            Ability::updateOrCreate(
                ['key' => $abilityData['key'], 'company_id' => $abilityData['company_id']],
                $abilityData
            );
        }
    }
}