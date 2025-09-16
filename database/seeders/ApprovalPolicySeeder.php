<?php

namespace Database\Seeders;

use App\Models\Ability;
use App\Models\ApprovalPolicy;
use App\Models\Company;
use Illuminate\Database\Seeder;

class ApprovalPolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first company or create one if none exists
        $company = Company::first() ?? Company::factory()->create();

        // Create sample abilities
        $abilities = [
            [
                'company_id' => $company->id,
                'key' => 'department_head',
                'label' => 'Department Head',
                'description' => 'Can approve department-related actions'
            ],
            [
                'company_id' => $company->id,
                'key' => 'hr_manager',
                'label' => 'HR Manager',
                'description' => 'Can approve HR-related actions'
            ],
            [
                'company_id' => $company->id,
                'key' => 'finance_approver',
                'label' => 'Finance Approver',
                'description' => 'Can approve financial actions'
            ],
            [
                'company_id' => $company->id,
                'key' => 'ceo',
                'label' => 'CEO',
                'description' => 'Can approve high-level actions'
            ],
            [
                'company_id' => $company->id,
                'key' => 'team_lead',
                'label' => 'Team Lead',
                'description' => 'Can approve team-related actions'
            ],
            [
                'company_id' => $company->id,
                'key' => 'hiring_manager',
                'label' => 'Hiring Manager',
                'description' => 'Can approve hiring related actions'
            ],
            [
                'company_id' => $company->id,
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

        // Create sample approval policies
        $policies = [
            [
                'company_id' => $company->id,
                'action' => 'offer_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $company->id,
                'action' => 'job_requisition_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $company->id,
                'action' => 'job_posting_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $company->id,
                'action' => 'leave_approval',
                'steps' => ['team_lead', 'department_head']
            ],
            [
                'company_id' => $company->id,
                'action' => 'expense_approval',
                'steps' => ['department_head', 'finance_approver']
            ],
            [
                'company_id' => $company->id,
                'action' => 'contract_approval',
                'steps' => ['hr_manager', 'finance_approver', 'ceo']
            ],
            [
                'company_id' => $company->id,
                'action' => 'promotion_approval',
                'steps' => ['department_head', 'hr_manager']
            ],
        ];

        foreach ($policies as $policyData) {
            ApprovalPolicy::updateOrCreate(
                ['action' => $policyData['action'], 'company_id' => $policyData['company_id']],
                $policyData
            );
        }
    }
}