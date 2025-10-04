<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobApplicationResource extends JsonResource
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
            'job_posting_id' => $this->job_posting_id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'cover_letter' => $this->cover_letter,
            'resume_path' => $this->resume_path,
            'status' => $this->status,
            'application_token' => $this->application_token,
            'token_expires_at' => $this->token_expires_at,
            'custom_fields' => $this->custom_fields,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'jobPosting' => $this->whenLoaded('jobPosting'),
            'company' => $this->whenLoaded('company'),
        ];
    }
}