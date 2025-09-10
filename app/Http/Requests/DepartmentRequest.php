<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    
    public function prepareForValidation(): void
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
            'name' => 'required|string|max:255',
            'manager_id' => 'required|exists:users,id',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'sometimes|boolean',
            'annual_budget' => 'nullable|numeric|min:0',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Department Name',
            'description' => 'Description',
            'is_active' => 'Active Status',
        ];
    }
}
