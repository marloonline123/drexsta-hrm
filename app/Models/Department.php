<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasActiveScope;
use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes, HasSearchScope, HasFilterByScope, HasActiveScope;

    protected $fillable = [
        'name',
        'slug',
        'company_id',
        'description',
        'is_active',
        'annual_budget',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'department_employee', 'department_id', 'employee_id')->withPivot('role');
    }

    public function managerRelation(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'department_employee', 'department_id', 'employee_id')
            ->where('department_employee.role', 'manager')
            ->withPivot('role');
    }

    // Convenient accessor for single manager
    public function getManagerAttribute(): ?User
    {
        return $this->managerRelation()->first();
    }
}
