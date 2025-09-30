<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ApprovalInstance extends BaseModel
{
    protected $fillable = [
        'approvable_type',
        'approvable_id',
        'approval_policy_id',
        'company_id',
        'type',
        'current_step',
        'is_completed',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'current_step' => 'integer',
    ];

    public function approvalPolicy(): BelongsTo
    {
        return $this->belongsTo(ApprovalPolicy::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function approvable()
    {
        return $this->morphTo();
    }

    public function approvalSteps(): HasMany
    {
        return $this->hasMany(ApprovalStep::class);
    }
}