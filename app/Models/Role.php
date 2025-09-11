<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Role extends SpatieRole
{
    /**
     * Get the company that owns the role.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}