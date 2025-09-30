<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApprovalStep extends BaseModel
{
    protected $fillable = [
        'approval_instance_id',
        'responsibility_id',
        'step_order',
        'status',
        'performed_by',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function approvalInstance(): BelongsTo
    {
        return $this->belongsTo(ApprovalInstance::class);
    }

    public function performer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

    // Based on the migration, responsibility_id references the abilities table
    public function responsibility(): BelongsTo
    {
        return $this->belongsTo(Ability::class, 'responsibility_id');
    }
}