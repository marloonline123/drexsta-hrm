<?php

namespace App\Traits;

use App\Models\User;

trait AuthorizesAdmin
{
    public function before(User $user, string $ability)
    {
        if ($user->roles->includes('Super Admin')) {
            return true;
        }
        
        if ($user->type !== 'employer') {
            return false;
        }

        return null;
    }
}
