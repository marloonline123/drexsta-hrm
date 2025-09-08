<?php

namespace App\Traits\GlobalScopes;

trait HasIsFeaturedScope
{
    public function scopeIsFeatured($query, string|bool|null $isFeatured = true)
    {
        if (empty($isFeatured)) return $query;
        if (gettype($isFeatured) !== 'string') {
            $isFeatured = filter_var($isFeatured, FILTER_VALIDATE_BOOLEAN);
        } else {
            $isFeatured = strtolower($isFeatured) === 'featured';
        }
        return $query->where('is_featured', $isFeatured);
    }
}
