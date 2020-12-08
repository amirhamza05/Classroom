<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Course\CourseCreate;
use App\Http\Requests\Course\TeacherAdd;
//custom controllers
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function create(CourseCreate $request)
    {
        $courseData = Course::create($request->all());
        return response()->json([
            'error'     => 0,
            'course_id' => $courseData->id,
            'msg' => "Successfully added new course"
        ]);
    }
    public function update()
    {

    }
    public function delete()
    {
        Course::find(request()->course_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully delete course",
        ]);
    }

    public function addTeacher(TeacherAdd $request)
    {
        Course::find(request()->course_id)->teachers()->attach(request()->user_id);
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully added teacher",
        ]);
    }

}
