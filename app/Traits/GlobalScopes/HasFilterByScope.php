<?php

namespace App\Traits\GlobalScopes;

use Illuminate\Database\Eloquent\Builder;

trait HasFilterByScope
{
    public function scopeFilterBy(Builder $query, string $filter, array|string|int|null $value): Builder
    {
        if (empty($filter) || is_null($value)) {
            return $query;
        }

        // Advanced operator support
        if (is_array($value)) {
            if (array_key_exists('operator', $value) && array_key_exists('value', $value)) {
                return $query->where($filter, $value['operator'], $value['value']);
            }

            return $query->whereIn($filter, $value);
        }

        return $query->where($filter, '=', $value);
    }
}