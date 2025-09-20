<?php

namespace App\Traits\ModelScopes;

use App\Models\Role as ModelsRole;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

trait HasCompanyRoles
{
    /**
     * @deprecated Use syncRolesInCompany instead.
     */
    public function syncRolesWithCompany(array|ModelsRole|Collection $roles, int $companyId)
    {
        $this->syncRolesInCompany($roles, $companyId);
    }

    public function syncRolesInCompany(array|ModelsRole|Collection $roles, int $companyId)
    {
        // Set the active company for the duration of this method
        $originalCompany = request()->user()->active_company_id;
        request()->user()->active_company_id = $companyId;

        // The HasCompanyScope will now filter roles to the specified company.
        // We can use the default syncRoles method from Spatie.
        $this->syncRoles($roles);

        // Restore the original active company
        request()->user()->active_company_id = $originalCompany;

        return $this;
    }
}
