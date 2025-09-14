<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobPostingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'job_requisition_id' => 'required|exists:job_requisitions,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'min_salary' => 'nullable|numeric|min:0',
            'max_salary' => 'nullable|numeric|min:0',
            'employment_type_id' => 'required|exists:employment_types,id',
            'target_start_date' => 'nullable|date',
            'closing_date' => 'nullable|date|after:target_start_date',
            'status' => 'required|in:draft,open,closed',
            'benefits' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'experience_years' => 'nullable|integer|min:0',
            'education_level' => 'nullable|string|max:255',
            'is_remote' => 'boolean',
        ];
    }
}