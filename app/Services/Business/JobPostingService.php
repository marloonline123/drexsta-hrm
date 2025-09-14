<?php

namespace App\Services\Business;

use App\Models\Company;
use App\Models\JobPosting;
use App\Models\JobRequisition;

class JobPostingService
{
    public function create(array $data = [], JobRequisition $requisition, Company $company): JobPosting
    {
        // Create the job posting with data from requisition
        $posting = JobPosting::create($data + [
            'company_id' => $company->id,
            'job_requisition_id' => $requisition->id,
            'title' => $requisition->jobTitle->title,
            'slug' => uniqueSlug(JobPosting::class, $company->id, $data['title'] ?? $requisition->jobTitle->title),
            'description' => $requisition->job_description,
            'requirements' => $requisition->requirements,
            'min_salary' => $requisition->min_salary,
            'max_salary' => $requisition->max_salary,
            'employment_type_id' => $requisition->employment_type_id ?? 'full_time',
        ]);

        return $posting;
    }
}