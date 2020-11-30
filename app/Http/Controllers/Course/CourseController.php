<?php

namespace App\Http\Controllers\Course;

use App\Course;
use App\CourseTeacher;
use App\Http\Controllers\Controller;

//custom controllers
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class CourseController extends Controller
{
    

    public function getRandomString($len = 6)
    {
        $characters   = '0123456789abcdefghijklmnopqrstuvwxyz';
        $randomString = "";
        for ($i = 0; $i < $len; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        return $randomString;
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if (!$validator->passes()) {
            return response()->json([
                'error'    => 1,
                'errorMsg' => $validator->errors()->all(),
            ]);
        }

        $data = $request->except('_token');

        $coverList = [
            'Chemistry.jpg', 'Geometry.jpg', 'Honors.jpg', 'img_breakfast.jpg', 'img_read.jpg',
        ];

        $data['cover']   = $coverList[rand() % count($coverList)];
        $data['code']    = $this->getRandomString(6);
        $data['user_id'] = Auth::user()->id;

        $courseId = Course::create($data)->id;
        
        CourseTeacher::create([
            'course_id' => $courseId,
            'user_id'       => Auth::user()->id,
            'role'          => 'admin',
        ]);

        return response()->json([
            'error'       => 0,
            'course_id' => $courseId,
        ]);
    }
    public function update(){

    }

    public function delete(){

    }
}
