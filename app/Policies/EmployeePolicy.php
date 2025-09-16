<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmployeePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('employees.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $employee): bool
    {
        return $user->hasPermissionTo('employees.view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('employees.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $employee): bool
    {
        return $user->hasPermissionTo('employees.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $employee): bool
    {
        return $user->hasPermissionTo('employees.delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $employee): bool
    {
        return $user->hasPermissionTo('employees.delete');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $employee): bool
    {
        return $user->hasPermissionTo('employees.delete');
    }
}