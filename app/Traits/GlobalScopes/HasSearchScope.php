<?php

namespace App\Traits\GlobalScopes;

use Illuminate\Database\Eloquent\Builder;

trait HasSearchScope
{
    public function scopeSearch(Builder $query, string|null $value, array|string $columns = 'name'): Builder
    {
        if (empty($columns) || empty($value)) return $query;

        $columns = (array) $columns;

        return $query->whereAny($columns, 'LIKE', "%{$value}%");
    }
}