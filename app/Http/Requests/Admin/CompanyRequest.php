<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
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
        $companyId = $this->route('company')?->id;
        return [
            'name' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20|unique:companies,phone,' . $companyId,
            'email' => 'nullable|email|max:255|unique:companies,email,' . $companyId,
            'address' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'logo_image' => 'nullable|image|mimes:jpeg,png,jpg|max:5148', // Max 5MB
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Company Name',
            'industry' => 'Industry',
            'slug' => 'Slug',
            'phone' => 'Phone Number',
            'email' => 'Email Address',
            'address' => 'Address',
            'description' => 'Description',
            'logo_path' => 'Company Logo',
            'is_active' => 'Active Status',
        ];
    }
}
