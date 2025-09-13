<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AbilityAssignment extends Model
{
    protected $fillable = [
        'company_id',
        'user_id',
        'ability_id',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ability(): BelongsTo
    {
        return $this->belongsTo(Ability::class);
    }
}