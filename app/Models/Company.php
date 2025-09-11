<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes, HasSearchScope, HasFilterByScope;

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
        return $this->belongsToMany(User::class, 'company_user');
    }

    public function employees(): BelongsToMany
    {
        return $this->users()->where('company_user.role', '!=', 'owner');
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
}