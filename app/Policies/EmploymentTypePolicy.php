<?php

namespace App\Policies;

use App\Models\EmploymentType;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class EmploymentTypePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('employment-types.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, EmploymentType $employmentType): bool
    {
        return $user->hasPermissionTo('employment-types.view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('employment-types.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, EmploymentType $employmentType): bool
    {
        return $user->hasPermissionTo('employment-types.edit');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EmploymentType $employmentType): bool
    {
        return $user->hasPermissionTo('employment-types.delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EmploymentType $employmentType): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EmploymentType $employmentType): bool
    {
        return false;
    }
}
