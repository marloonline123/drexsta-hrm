<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasActiveScope;
use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobTitle extends BaseModel
{
    use SoftDeletes,
    HasSearchScope,
    HasFilterByScope,
    HasActiveScope;

    protected $fillable = [
        'company_id',
        'title',
        'slug',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Relationships
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}