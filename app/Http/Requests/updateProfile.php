<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updateProfile extends FormRequest
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
            'full_name' => 'required',
            'nick_name' => 'required',
            'email'     => 'required|email',
            'phone'     => 'required|regex:/^((01)[0-9\s\-\+\(\)]*)$/|min:10',
        ];
    }
    public function messages()
    {
        return [
            'full_name.required' => "Full name field is required",
            'nick_name.required' => "Nick name field is required",
            'email.required' => "Email field is required",
            'email.email' => "This Password format is not correct",
            'phone.required' =>"Phone Number is required"
        ];
    }
}
