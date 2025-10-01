<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobPostingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'job_requisition_id' => $this->job_requisition_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'requirements' => $this->requirements,
            'location' => $this->location,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'employment_type' => $this->employment_type,
            'target_start_date' => $this->target_start_date?->format('Y-m-d'),
            'closing_date' => $this->closing_date?->format('Y-m-d'),
            'status' => $this->status,
            'benefits' => $this->benefits,
            'responsibilities' => $this->responsibilities,
            'experience_years' => $this->experience_years,
            'education_level' => $this->education_level,
            'is_remote' => $this->is_remote,
            'custom_fields' => $this->custom_fields,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'employmentType' => $this->whenLoaded('employmentType'),
            'jobRequisition' => $this->whenLoaded('jobRequisition'),
            'applications_count' => $this->whenLoaded('applications', fn() => $this->applications->count()),
        ];
    }
}