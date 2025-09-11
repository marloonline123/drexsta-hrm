<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
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
        $user = Auth::user();
        $company = $user->activeCompany();
        $companyId = $company ? $company->id : null;
        
        $roleId = $this->route('role');
        
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'exists:permissions,id'],
        ];
        
        // Add unique constraint for name within the company
        if ($companyId) {
            $uniqueRule = Rule::unique('roles', 'name')->where(function ($query) use ($companyId) {
                return $query->where('company_id', $companyId);
            });
            
            if ($roleId) {
                // When updating, exclude the current role from the unique check
                $uniqueRule = $uniqueRule->ignore($roleId);
            }
            
            $rules['name'] = [$rules['name'], $uniqueRule];
        }

        return $rules;
    }

    public function attributes(): array
    {
        return [
            'name' => 'Role Name',
            'permissions' => 'Permissions',
        ];
    }
}