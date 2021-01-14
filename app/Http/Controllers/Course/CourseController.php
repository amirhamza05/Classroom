<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Course\CourseCreate;
use App\Http\Requests\Course\TeacherAdd;
use App\Http\Requests\Course\CourseJoin;
use App\Http\Requests\Course\StudentAdd;
use App\Http\Controllers\Layout\LayoutController as Layout;

//custom controllers
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\User;

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
    public function courseUpdate(CourseCreate $request){
        Course::find(request()->course_id)->update(request()->all());
        return response()->json([
            'error'     => 0,
            'msg' => "Successfully Update course"
        ]);
    }

    public function routine(){
        $courseList = auth()->user()->courses()->where(['status' => 'accept','is_archive' => '0'])->get();
        return Layout::view("course.page.routine", [
            'courseList' => $courseList,
        ]);
    }

    public function join(CourseJoin $request)
    {
       
        $courseData = Course::where(['code'=>request()->code])->firstOrFail();
        $check = $courseData->students()->where(['user_id'=>auth()->user()->id])->first();
  
       if($check==null){
            $courseData->students()->attach(auth()->user()->id);
            return response()->json([
            'error'     => 0,
            'msg' => "Successfully added new course"
            ]);
       }
       else{
            return response()->json([
            'error'     => 1,
            'msg' => "Already joined in this course"
             ]);
       }  
    }


    public function update(CourseCreate $request)
    {
        $courseData = Course::create($request->all());
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
    public function addStudent(StudentAdd $request)
    {   
        Course::find(request()->course_id)->students()->attach(request()->user_id);
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully added student",
        ]);
    }
    public function confirmRequest(){
        Course::find(request()->course_id)->teachers()->updateExistingPivot(auth()->user()->id, array('status' => 'accept'), false);
    }

    public function leave(){
        if(request()->user()->user_type == 'Student'){
            Course::find(request()->course_id)->students()->detach(auth()->user()->id);
        }
        else{
        Course::find(request()->course_id)->teachers()->detach(auth()->user()->id);
        }
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully leave you in this course",
        ]);
    }

    public function updateArchive(){
        $isArchive = request()->is_archive;
        Course::find(request()->course_id)->update(['is_archive'=>$isArchive]);
        $msg = $isArchive?"add archive":"add current";
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully $msg this course",
        ]);
    }

    public function deleteTeacher(){
         Course::find(request()->course_id)->teachers()->detach(request()->user_id);
         return response()->json([
            'error' => 0,
            'msg'   => "Successfully deleted teacher",
        ]);
    }
    public function deleteStudent(){
         Course::find(request()->course_id)->students()->detach(request()->user_id);
         return response()->json([
            'error' => 0,
            'msg'   => "Successfully deleted student",
        ]);
    }
    public function teacherList(){
        //dd(request()->query);
       
        $searchValue = request()->get('searchVal');

        $data = User::Where(['user_type' => 'Teacher'])
        ->where(function($query) use ($searchValue){
            $query->orWhere('full_name','LIKE','%'.$searchValue.'%');
            $query->orWhere('nick_name','LIKE','%'.$searchValue.'%');
            $query->orWhere('login_id','LIKE','%'.$searchValue.'%');
            $query->orWhere('email','LIKE','%'.$searchValue.'%');
            $query->orWhere('phone','LIKE','%'.$searchValue.'%');
        })
        ->get();
        return response()->json($data->toArray());
    }
}
