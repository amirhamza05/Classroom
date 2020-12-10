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


class home extends Controller
{

    public function studentDashboard(){
        if (!Auth::check()) {
            return redirect('/');
        }
        echo "<center><h1>welcome student dashboard <a href='/logout'>Logout</a></h1></center>";
    }

    public function teacherDashboard(Request $request){
        if (!Auth::check()) {
            return redirect('/');
        }
        return Layout::view("teacher.dashboard");
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

        //$Notification = new NotificationController(); 
        //$response = Notification::send('sms',[
        //    'to' => "01777564786",
        //    'body' => 'Hello Laravel'
        //]);
       // File::put(public_path() . '/static/index.html', View::make('home.mail'));
       // file_put_contents('home.mail', "dfg");
        // $id = 1000;
        // echo base_convert($id, 10, 33), "\n";
        //  $data = NotificationTemplate::customSet(['from_name'=>"hey",'subject'=>'','sms_body'=>'dear [[nick]], welcome to our system\n\n[[app_name]]','mail_body' => ''],[
        //      [
        //          'nick'=>'hamza'
        //      ],
        //      [   
        //          'nick' => "Rahim"
        //      ]
        //  ]
        //  );

        // $data = NotificationTemplate::set('welcome',[
        //      [
        //          'nick'=>'Alice'
        //      ],
        //      [   
        //          'nick' => "Bob"
        //      ]
        //  ]
        //  );
        // echo "<pre>";
        // print_r($data);
        // echo "</pre>";

     // echo "<textarea>$html</textarea>";

        //$data = NotificationTemplate::reset();
        //echo "<pre>";
        //print_r($data);
        //echo "</pre>";
        Notification::clearQueue();

        return;

        $response = Notification::send('email',[
            'to' => "sk.amirhamza@gmail.com",
            'subject' => "Ok. This is Ok",
            'body' => 'Your class room is ok'
        ]);

        print_r($response);

        return;
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
