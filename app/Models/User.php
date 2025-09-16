<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasRoles, HasSearchScope;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'phone',
        'email',
        'password',
        'active_company_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function activeCompany()
    {
        return $this->belongsTo(Company::class, 'active_company_id');
    }

    public function ownedCompanies()
    {
        return $this->belongsToMany(Company::class, 'company_user')->where('company_user.role', 'owner');
    }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'company_user');
    }

    public function abilities()
    {
        return $this->belongsToMany(Ability::class, 'ability_assignments')->withPivot('company_id');
    }
}