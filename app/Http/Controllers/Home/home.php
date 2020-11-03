<?php

namespace App\Http\Controllers\home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//custom file
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Validator;


class home extends Controller
{

    public function studentDashboard(){
        if (!Auth::check()) {
            return redirect('/');
        }
        echo "<center><h1>welcome student dashboard <a href='/logout'>Logout</a></h1></center>";
    }

    public function teacherDashboard(){
        if (!Auth::check()) {
            return redirect('/');
        }
        echo "<center><h1>welcome teacher dashboard <a href='/logout'>Logout</a></h1></center>";
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
    public function test(){
        $userData = $user = DB::table('users')->where('nick_name', 'hamza')->first();
        $user = auth()->user();
        print_r($user);
        if (Auth::check()) {
            // The user is logged in...
            echo "login";
            return;
        }
        echo "Failed";
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

    
}
