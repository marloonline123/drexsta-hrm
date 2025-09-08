<?php

namespace App\Traits\GlobalScopes;

trait HasIsFreeScope
{
    public function scopeIsFree($query, string|null $isFree)
    {
        if (empty($isFree)) return $query;
        $isFree = $isFree === 'free' ? true : false;
        return $query->where('is_free', $isFree);
    }
}