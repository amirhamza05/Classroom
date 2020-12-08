<?php

namespace App\Http\Controllers\Course;

use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CoursePageController extends Controller
{
    public function getLayout($request)
    {
        return isset($request->noLayout) ? 'body_layout' : 'layout';
    }
    public function mergeDefaultData($request, $data = [])
    {
        $courseData = Course::where('id', $request->course_id)->get()->first();
        return array_merge($data, [
            'layout'     => $this->getLayout($request),
            'courseData' => $courseData,
        ]);
    }
    public function createCourse()
    {
        return view('course.create_course');
    }
    public function viewCourseList(Request $request)
    {
        $courseList = Course::all();
        return view("course.course_list", [
            'layout'     => $this->getLayout($request),
            'courseList' => $courseList,
        ]);
    }
    public function viewTeacherList(Request $request)
    {
        return view("course.page.teacher_list", $this->mergeDefaultData($request));
    }
    public function viewDashboard(Request $request)
    {
        return view("course.dashboard", $this->mergeDefaultData($request));
    }
}
