<?php

namespace App\Services\Business\CompanySetup;

use App\Models\ApprovalPolicy;

class ApprovalPolicySetup
{
    public function setupForCompany(?int $companyId = null): void
    {
        // Create default approval policies
        $policies = [
            [
                'company_id' => $companyId,
                'action' => 'offer_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $companyId,
                'action' => 'job_requisition_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $companyId,
                'action' => 'job_posting_approval',
                'steps' => ['department_head', 'hr_manager', 'finance_approver']
            ],
            [
                'company_id' => $companyId,
                'action' => 'leave_approval',
                'steps' => ['team_lead', 'department_head']
            ],
            [
                'company_id' => $companyId,
                'action' => 'expense_approval',
                'steps' => ['department_head', 'finance_approver']
            ],
            [
                'company_id' => $companyId,
                'action' => 'contract_approval',
                'steps' => ['hr_manager', 'finance_approver', 'ceo']
            ],
            [
                'company_id' => $companyId,
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