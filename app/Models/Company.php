<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasActiveScope;
use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes, HasSearchScope, HasFilterByScope, HasActiveScope;

    protected $fillable = [
        'name',
        'industry',
        'slug',
        'phone',
        'email',
        'address',
        'description',
        'logo_path',
        'is_active',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function owner(): ?User
    {
        return $this->users()->where('company_user.role', 'owner')->first();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'company_user')->using(CompanyUser::class)->withPivot('role');
    }

    public function employees(): BelongsToMany
    {
        return $this->users()->where('company_user.role', '!=', 'owner')->using(CompanyUser::class)->withPivot('role');
    }

    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }

    public function employmentTypes(): HasMany
    {
        return $this->hasMany(EmploymentType::class);
    }

    public function jobTitles(): HasMany
    {
        return $this->hasMany(JobTitle::class);
    }

    public function roles(): HasMany
    {
        return $this->hasMany(Role::class);
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class);
    }

    public function abilities(): HasMany
    {
        return $this->hasMany(Ability::class);
    }

    public function approvalPolicies(): HasMany
    {
        return $this->hasMany(ApprovalPolicy::class);
    }

    public function jobRequisitions(): HasMany
    {
        return $this->hasMany(JobRequisition::class);
    }

    public function jobPostings(): HasMany
    {
        return $this->hasMany(JobPosting::class);
    }
}