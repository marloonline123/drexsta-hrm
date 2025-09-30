<?php

namespace App\Services\Business\CompanySetup;

use App\Models\Company;

class CompanySetupService
{
    public function __construct(
        private PermissionRoleSetupService $permissionRoleSetupService,
        private AbilitiesSetup $abilitiesSetup,
        private ApprovalPolicySetup $approvalPolicySetup
    ) {}
    public function setupDefaults(Company $company): void
    {
        // Create default Roles and Permissions for the company
        $this->permissionRoleSetupService->setupForCompany($company->id);

        // Create default Abilities
        $this->abilitiesSetup->setupForCompany($company->id);

        // Create default Approval Policies
        $this->approvalPolicySetup->setupForCompany($company->id);
    }
}