<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobRequisitionResource extends JsonResource
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
                'department_id' => $this->department_id,
                'job_title_id' => $this->job_title_id,
                'requested_by' => $this->requested_by,
                'requisition_code' => $this->requisition_code,
                'number_of_positions' => $this->number_of_positions,
                'job_description' => $this->job_description,
                'requirements' => $this->requirements,
                'employment_type_id' => $this->employment_type_id,
                'employment_type' => $this->employment_type,
                'min_salary' => $this->min_salary,
                'max_salary' => $this->max_salary,
                'target_start_date' => $this->target_start_date?->format('Y-m-d'),
                'status' => $this->status,
                'reason' => $this->reason,
                'additional_notes' => $this->additional_notes,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                'department' => $this->whenLoaded('department'),
                'jobTitle' => $this->whenLoaded('jobTitle'),
                'requester' => $this->whenLoaded('requester'),
                'employmentType' => $this->whenLoaded('employmentType'),
            ];
        }
}