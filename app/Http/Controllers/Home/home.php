<?php

namespace App\Http\Controllers\home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//custom file
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

//custom controllers
use App\Http\Controllers\Notification\NotificationController as Notification;
use App\Http\Controllers\Notification\Template\NotificationTemplateController as NotificationTemplate;
use App\Http\Controllers\Layout\LayoutController as Layout;
use Validator;
use App\Models\Course;

class home extends Controller
{

    public function studentDashboard(){
        if (!Auth::check()) {
            return redirect('/');
        }
        // echo "<center><h1>welcome student dashboard <a href='/logout'>Logout</a></h1></center>";
    //    $courseList = auth()->user()->courses()->where(['status'=>'pending'])->get();
    //     return Layout::view("teacher.dashboard",['pendingCourseList'=>$courseList]);
        $activeList = auth()->user()->courses()->where(['status' => 'accept','is_archive' => '0'])->get();
        $requestList = auth()->user()->courses()->where(['status'=>'pending'])->get();
        $arciveList = auth()->user()->courses()->where(['is_archive' => '1'])->get();

        return Layout::view("teacher.dashboard",['activeCourseList'=> $activeList,'requestCourseList'=> $requestList,'archiveCourseList'=> $arciveList]);
    
    }

    public function teacherDashboard(Request $request){
        if (!Auth::check()) {
            return redirect('/');
        }
        
        $activeList = auth()->user()->courses()->where(['status' => 'accept','is_archive' => '0'])->get();
        $requestList = auth()->user()->courses()->where(['status'=>'pending'])->get();
        $arciveList = auth()->user()->courses()->where(['is_archive' => '1'])->get();

        return Layout::view("teacher.dashboard",['activeCourseList'=> $activeList,'requestCourseList'=> $requestList,'archiveCourseList'=> $arciveList]);
    }


    public function home(){
        if (Auth::check()) {
            
            $userType = auth()->user()->user_type; 

            echo "You are log in";
            if($userType == "Student")
                return redirect('/student/dashboard');
            else 
                return redirect('/teacher/dashboard');
        }
        return view('home');
    }

    public function loadPage(Request $request)
    {
        $reqData  = $request->all();
        $pageList = [
            'login' => 1, 'registration' => 1, 'reset_pass' => 1,'registration_success' => 1
        ];
        if (isset($pageList[$reqData['page']])) {
            return view('home/' . $reqData['page']);
        }
        return "Request Not Found";
    }

    public function test(){
        return view("test");
    }
}
