<?php

namespace App\Http\Controllers\Course;

use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Layout\LayoutController as Layout;

class CoursePageController extends Controller
{
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
    public function joinCourse()
    {
        return view('course.join_course');
    }
    public function setting(){
        return Layout::view("course.page.setting", $this->mergeDefaultData());
    }
    public function viewCourseList()
    {
        $where = ['status' => 'accept','is_archive' => '0'];
        if(isset(request()->request_courses))$where = ['status'=> 'pending'];
        else if(isset(request()->archive_course))$where = ['is_archive' => '1'];
      
        
        $courseList = auth()->user()->courses()->where($where)->get();
        return Layout::view("course.course_list", [
            'courseList' => $courseList,
        ]);
    }
    public function viewTeacherList()
    {
        return Layout::view("course.page.teacher_list", $this->mergeDefaultData());
    }
    public function viewStudentList()
    {
        return Layout::view("course.page.student_list", $this->mergeDefaultData());
    }
    public function viewDashboard()
    {
        return Layout::view("course.dashboard", $this->mergeDefaultData());
    }
    public function viewAddTeacher(){
        return view('course.page.add_teacher');
    }

    public function viewScheduleList(){
        //return Layout::view("course.schedule.schedule_list", $this->mergeDefaultData());
    }
}
