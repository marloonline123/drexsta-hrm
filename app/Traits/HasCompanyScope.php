<?php

namespace App\Traits;

use App\Scopes\CompanyScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait HasCompanyScope
{
    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope(new CompanyScope());

        static::creating(function (Model $model) {
            if (Auth::check()) {
                $model->company_id = $model->company_id ?? Auth::user()->active_company_id;
            }
        });
    }
}