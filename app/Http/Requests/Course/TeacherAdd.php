<?php

namespace App\Http\Requests\Course;

use Illuminate\Foundation\Http\FormRequest;

class TeacherAdd extends FormRequest
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
            'user_id' => 'exists:users,id|exists:users,id,user_type,Teacher|unique:course_teachers,user_id,NULL,NULL,course_id,'.request()->course_id,
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user_id.exists' => "The teacher id is not valid",
            'user_id.unique' => "This teacher is already added this course"
        ];
    }
}
