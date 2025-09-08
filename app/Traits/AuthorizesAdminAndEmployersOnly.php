<?php

namespace App\Traits;

use App\Models\User;

trait AuthorizesAdminAndEmployersOnly
{
    public function before(User $user, string $ability)
    {
        if ($user->type === 'admin') {
            return true;
        }
        
        if ($user->type !== 'employer') {
            return false;
        }

        return null;
    }
}
