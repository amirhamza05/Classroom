<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\Course\CourseCreate;
use App\Http\Requests\Course\TeacherAdd;
//custom controllers
use App\Models\Course;
use Illuminate\Http\Request;

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
    public function leave(){
        Course::find(request()->course_id)->teachers()->detach(auth()->user()->id);
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully leave you in this course",
        ]);
    }

    public function deleteTeacher(){
         Course::find(request()->course_id)->teachers()->detach(request()->user_id);
         return response()->json([
            'error' => 0,
            'msg'   => "Successfully deleted teacher",
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
