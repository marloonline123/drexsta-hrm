<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApprovalPolicy extends BaseModel
{
    protected $fillable = [
        'company_id',
        'action',
        'steps',
    ];

    protected $casts = [
        'steps' => 'array',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}