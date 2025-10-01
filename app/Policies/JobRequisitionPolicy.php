<?php

namespace App\Policies;

use App\Models\JobRequisition;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobRequisitionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('job-requisitions.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobRequisition $jobRequisition): bool
    {
        return $user->hasPermissionTo('job-requisitions.view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('job-requisitions.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobRequisition $jobRequisition): bool
    {
        return $user->hasPermissionTo('job-requisitions.edit');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobRequisition $jobRequisition): bool
    {
        return $user->hasPermissionTo('job-requisitions.delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobRequisition $jobRequisition): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobRequisition $jobRequisition): bool
    {
        return false;
    }
}
