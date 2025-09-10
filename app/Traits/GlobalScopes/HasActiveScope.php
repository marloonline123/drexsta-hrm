<?php

namespace App\Traits\GlobalScopes;

use Illuminate\Database\Eloquent\Builder;

trait HasActiveScope
{
    public function scopeActive(Builder $query, ?bool $isActive = true)
    {
        $isActive = boolval($isActive);
        if ($isActive === null) return $query;
        return $query->where('is_active', $isActive);
    }
}