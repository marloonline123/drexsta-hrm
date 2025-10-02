<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Ability;
use App\Rules\UniqueScoped;
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
        return [
            'key' => [
                'required',
                'string',
                'max:100',
                (new UniqueScoped(Ability::class, 'key', 'company_id', Auth::user()->company_id, $this->ability?->id))->except($this->ability?->id ?? 0),
            ],
            'label' => ['required', 'string', 'max:150',
                (new UniqueScoped(Ability::class, 'label', 'company_id', Auth::user()->company_id, $this->ability?->id))->except($this->ability?->id ?? 0),
            ],
            'description' => 'nullable|string|max:255',
        ];
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