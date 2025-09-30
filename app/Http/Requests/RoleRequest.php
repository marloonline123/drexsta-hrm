<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;
use App\Rules\UniqueScoped;
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
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                (new UniqueScoped('roles', 'name', 'company_id', Auth::user()->active_company_id))->except($this->role?->id ?? 0),
            ],
            'permissions' => 'array|min:1',
            'permissions.*' => 'exists:permissions,id',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Role Name',
            'permissions' => 'Permissions',
        ];
    }
}