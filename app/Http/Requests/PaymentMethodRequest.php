<?php

namespace App\Http\Requests;

use App\Rules\UniqueScoped;
use Illuminate\Foundation\Http\FormRequest;

class PaymentMethodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
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
        $companyId = request()->user()->active_company_id;
        $exceptId = $this->route('paymentMethod')?->id ?? 0;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                (new UniqueScoped('payment_methods', 'name', 'company_id', $companyId))->except($exceptId)
            ],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }
}
