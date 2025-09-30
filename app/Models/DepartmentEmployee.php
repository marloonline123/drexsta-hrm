<?php

namespace App\Models;

use App\Traits\HasCompanyScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Auth;

class DepartmentEmployee extends Pivot
{
    protected $table = 'department_employee';

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
        'employee_id',
        'department_id',
        'role',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function employee()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
