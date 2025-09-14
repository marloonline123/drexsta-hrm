<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    protected $fillable = [
        'company_id',
        'job_posting_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'cover_letter',
        'resume_path',
        'status',
        'application_token',
        'token_expires_at',
        'custom_fields',
    ];

    protected $casts = [
        'token_expires_at' => 'datetime',
        'custom_fields' => 'array',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    /**
     * Check if the application can be edited.
     */
    public function canBeEdited(): bool
    {
        return $this->status !== 'under_review' && 
               $this->jobPosting->status !== 'closed' &&
               $this->token_expires_at && 
               $this->token_expires_at->isFuture();
    }

    /**
     * Generate a secure token for editing the application.
     */
    public function generateToken(): void
    {
        $this->application_token = bin2hex(random_bytes(32));
        $this->token_expires_at = now()->addDays(7); // Token valid for 7 days
        $this->save();
    }
}