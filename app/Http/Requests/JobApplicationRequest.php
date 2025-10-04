<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobApplicationRequest extends FormRequest
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
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'cover_letter' => 'nullable|string',
            'resume_file' => 'required|file|mimes:pdf,doc,docx|max:10240', // Max 10MB
        ];

        // Additional rules for application updates
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // For updates, we might want to be less strict
            $rules['cover_letter'] = 'nullable|string';
        }

        return $rules;
    }
}