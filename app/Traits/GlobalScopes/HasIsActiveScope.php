<?php

namespace App\Traits\GlobalScopes;

trait HasIsActiveScope
{
    public function scopeIsActive($query, string|null $isActive)
    {
        if (empty($isActive)) return $query;
        $isActive = $isActive === 'active' ? true : false;
        return $query->where('is_active', $isActive);
    }
}