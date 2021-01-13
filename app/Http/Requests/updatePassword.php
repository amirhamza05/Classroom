<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updatePassword extends FormRequest
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
            'old_password' => 'required',
            'new_password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
        ];
    }
    public function messages()
    {
        return [
            'old_password.required' => "The Current field is required",
            'new_password.required' => "New Password filed is required ",
            'new_password.regex' => "This Password format is not correct"
        ];
    }
}
