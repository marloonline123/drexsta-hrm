<?php

namespace App\Models;

use App\Enums\JobPostingStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobPosting extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'company_id',
        'job_requisition_id',
        'job_title_id',
        'number',
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
        'status' => JobPostingStatus::class,
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function jobRequisition(): BelongsTo
    {
        return $this->belongsTo(JobRequisition::class);
    }

    public function jobTitle(): BelongsTo
    {
        return $this->belongsTo(JobTitle::class);
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
        return $query->where('status', JobPostingStatus::OPEN);
    }

    /**
     * Scope a query to only include job postings that are not closed.
     */
    public function scopeNotClosed($query)
    {
        return $query->where('status', '!=', JobPostingStatus::CLOSED);
    }
}