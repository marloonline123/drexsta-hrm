<?php

namespace App\Traits;

trait GlobalScopesTrait
{
    public function scopeIsActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeIsInactive($query)
    {
        return $query->where('is_active', false);
    }

    public function scopeIsFree($query)
    {
        return $query->where('price', 0);
    }

    public function scopeFilterByStatus($query, $status)
    {
        if ($status !== 'all') {
            $status = filter_var($status, FILTER_VALIDATE_BOOLEAN);
            return $query->where('is_active', $status);
        }

        return $query;
    }

    public function scopeIsPaid($query)
    {
        return $query->where('price', '>', 0);
    }

    public function scopeSearchByName($query, $name)
    {
        return $query->when($name, fn($q) => $q->where('name', 'like', "%$name%"));
    }

    // Add more common scopes here...
}
