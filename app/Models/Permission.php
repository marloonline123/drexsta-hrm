<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends SpatiePermission
{
    /**
     * Get the company that owns the permission.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}