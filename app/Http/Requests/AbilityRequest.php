<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Ability;
use Illuminate\Validation\Rule;

class AbilityRequest extends FormRequest
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
        $company = $user->activeCompany;
        $companyId = $company ? $company->id : null;
        
        $abilityId = $this->route('ability');
        
        $rules = [
            'key' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ];
        
        // Add unique constraint for key within the company
        if ($companyId) {
            $uniqueRule = Rule::unique('abilities', 'key')->where(function ($query) use ($companyId) {
                return $query->where('company_id', $companyId);
            });
            
            if ($abilityId) {
                // When updating, exclude the current ability from the unique check
                $uniqueRule = $uniqueRule->ignore($abilityId);
            }
            
            $rules['key'] = [$rules['key'], $uniqueRule];
        }

        return $rules;
    }

    public function attributes(): array
    {
        return [
            'key' => 'Ability Key',
            'label' => 'Ability Label',
            'description' => 'Description',
        ];
    }
}