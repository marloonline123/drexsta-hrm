<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Auth;

class CompanyUser extends Pivot
{
    protected $table = 'company_user';

    protected static function booted()
    {
        static::creating(function ($model) {
            if (Auth::check()) {
                $model->company_id = $model->company_id ?? Auth::user()->active_company_id;
            }
            $model->updated_at = $model->updated_at ?? now();
            $model->created_at = $model->created_at ?? now();
        });
    }

    protected $fillable = [
        'company_id',
        'user_id',
        'role',
    ];
}
