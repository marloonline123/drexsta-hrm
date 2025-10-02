<?php

namespace App\Http\Requests;

use App\Rules\UniqueScoped;
use Illuminate\Foundation\Http\FormRequest;

class EmploymentTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 
                (new UniqueScoped('employment_types', 'name', 'company_id', request()->user()->active_company_id))->except($this->employment_type?->id ?? 0)
            ],
            'description' => 'nullable|string|max:500',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Employment Type Name',
            'description' => 'Description',
            'is_active' => 'Active Status',
        ];
    }
}
