<?php

namespace App\Services\Business;

use App\Models\Company;
use App\Models\User;

class AbilityService
{
    public function syncEmployeeAbilities(Company $company, User $employee, array $abilityIds)
    {
        $employee->abilities()->wherePivot('company_id', $company->id)->detach();
        foreach ($abilityIds as $abilityId) {
            $employee->abilities()->attach($abilityId, ['company_id' => $company->id]);
        }
    }
}