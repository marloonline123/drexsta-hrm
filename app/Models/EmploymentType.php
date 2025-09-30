<?php

namespace App\Models;

use App\Traits\GlobalScopes\HasActiveScope;
use App\Traits\GlobalScopes\HasFilterByScope;
use App\Traits\GlobalScopes\HasSearchScope;
use App\Traits\HasCompanyScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class EmploymentType extends BaseModel
{
    use SoftDeletes, 
        HasSearchScope, 
        HasFilterByScope, 
        HasActiveScope;

    protected $fillable = [
        'company_id',
        'name',
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
