<?php

namespace App\Http\Controllers\Course;

use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Layout\LayoutController as Layout;

class CoursePageController extends Controller
{
    public function __construct($foo = null)
    {
        return view('course.create_course');
        //exit;
    }
    public function mergeDefaultData()
    {
        $courseData = Course::where('id', request()->course_id)->get()->first();
        return [
            'courseData' => $courseData
        ];
    }
    public function createCourse()
    {
        return view('course.create_course');
    }
    public function viewCourseList()
    {
        $courseList = Course::all();
        return Layout::view("course.course_list", [
            'courseList' => $courseList,
        ]);
    }
    public function viewTeacherList()
    {
        return Layout::view("course.page.teacher_list", $this->mergeDefaultData());
    }
    public function viewDashboard()
    {
        return Layout::view("course.dashboard", $this->mergeDefaultData());
    }
}
