<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => ['required', 'string', 'max:255', 'unique:products'],
            'names' => ['required', 'string'],
            'measure_id' => ['required', 'integer'],
            'category_id' => ['required', 'integer'],
            'purchase_price' => ['required', 'numeric'],
            'sale_price' => ['required', 'numeric'],
        ];

    }

    public function messages()
    {
        return [
            'code.required' => 'El codigo es requerido.',
            'code.string' => 'El codigo con formato válido.',
            'code.max' => 'La logitud maxima es de 190 caracteres.',
            'code.unique' => 'El codigo tienen que ser unico',
        ];
    }
}
