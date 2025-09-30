<?php

namespace Database\Seeders;

use App\Models\Ability;
use App\Models\ApprovalPolicy;
use App\Models\Company;
use App\Services\Business\CompanySetup\AbilitiesSetup;
use App\Services\Business\CompanySetup\ApprovalPolicySetup;
use Illuminate\Database\Seeder;

class ApprovalPolicySeeder extends Seeder
{
    public function __construct(
        private AbilitiesSetup $abilitiesSetup,
        private ApprovalPolicySetup $approvalPolicySetup
    ) {}
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first company or create one if none exists
        $company = Company::first() ?? Company::factory()->create();

        // Create sample abilities
        $this->abilitiesSetup->setupForCompany($company->id);

        // Create sample approval policies
        $this->approvalPolicySetup->setupForCompany($company->id);
    }
}