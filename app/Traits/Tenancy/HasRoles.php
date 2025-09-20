<?php

namespace App\Traits\Tenancy;

use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles as SpatieHasRoles;

trait HasRoles
{
    use SpatieHasRoles;

    /**
     * A model may have multiple roles.
     */
    public function roles(): MorphToMany
    {
        $relation = $this->morphToMany(
            config('permission.models.role'),
            'model',
            config('permission.table_names.model_has_roles'),
            config('permission.column_names.model_morph_key'),
            'role_id'
        );

        if (!Auth::check()) {
            return $relation;
        }

        return $relation->where(config('permission.table_names.roles').'.company_id', '=', Auth::user()->company_id);
    }
}