<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Database\Eloquent\Model;
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

    public function users()
    {
        return $this->belongsToMany(User::class, 'company_user');
    }

    public function nonOwnerUsers()
    {
        return $this->users()->where('company_user.role', '!=', 'owner');
    }
}
