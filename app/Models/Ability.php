<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ability extends Model
{
    protected $fillable = [
        'company_id',
        'key',
        'label',
        'description',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function abilityAssignments(): HasMany
    {
        return $this->hasMany(AbilityAssignment::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'ability_assignments');
    }
}