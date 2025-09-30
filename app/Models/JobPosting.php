<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends BaseModel
{    
    protected $fillable = [
        'company_id',
        'job_requisition_id',
        'title',
        'slug',
        'description',
        'requirements',
        'location',
        'min_salary',
        'max_salary',
        'employment_type_id',
        'target_start_date',
        'closing_date',
        'status',
        'benefits',
        'responsibilities',
        'experience_years',
        'education_level',
        'is_remote',
        'custom_fields',
    ];

    protected $casts = [
        'min_salary' => 'decimal:2',
        'max_salary' => 'decimal:2',
        'target_start_date' => 'date',
        'closing_date' => 'date',
        'is_remote' => 'boolean',
        'custom_fields' => 'array',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function jobRequisition(): BelongsTo
    {
        return $this->belongsTo(JobRequisition::class);
    }

    public function employmentType(): BelongsTo
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope a query to only include open job postings.
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    /**
     * Scope a query to only include job postings that are not closed.
     */
    public function scopeNotClosed($query)
    {
        return $query->where('status', '!=', 'closed');
    }
}