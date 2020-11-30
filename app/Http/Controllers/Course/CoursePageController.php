<?php

namespace App\Http\Controllers\Course;

use App\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoursePageController extends Controller
{
    public function getLayout($request)
    {
        return isset($request->noLayout) ? 'body_layout' : 'layout';
    }
    public function createCourse(){
    	return view('course.create_course');
    }
    public function viewCourseList(Request $request)
    {
        $courseList = Course::all();
        return view("course.course_list", [
            'layout'        => $this->getLayout($request),
            'courseList' => $courseList,
        ]);
    }
    public function viewDashboard(Request $request)
    {
        $courseData = Course::where('id',$request->courseId)->get()->first();
        return view("course.dashboard", [
            'layout' => $this->getLayout($request),
            'courseData' => $courseData
        ]);
    }
}
