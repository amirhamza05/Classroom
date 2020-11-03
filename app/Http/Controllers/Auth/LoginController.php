<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

//custom added
use Illuminate\Support\Facades\Auth;
use Validator;
use DB;
use App\User;


class LoginController extends Controller
{
    //
    public function login(Request $request)
    {
        $reqData = $request->all();

        $validator = Validator::make($request->all(), [
            'login_id' => 'required',
            'password' => 'required',
        ]);

        if (!$validator->passes()) {
            return response()->json([
                'error'    => 1,
                'errorMsg' => $validator->errors()->all(),
            ]);
        }

        $credentials = $request->only('login_id', 'password');

        if (Auth::attempt($credentials)) {
            return response()->json([
                'error'    => 0,
                'errorMsg' => 'Successfully Login',
            ]);
        }

        return response()->json([
            'error'    => 1,
            'errorMsg' => 'User info is not correct',
        ]);
    }

    public function getRandomString($len = 6){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        $randomString = "";
        for ($i = 0; $i < $len; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        }
        return $randomString;
    }

    public function registration(Request $request)
    {
        $reqData = $request->all();

        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'nick_name' => 'required',
            'user_type' => 'required',
            'email'     => 'required|email',
            'phone'    => 'required|regex:/(01)[0-9]{9}/',
        ]);

        if (!$validator->passes()) {
            return response()->json([
                'error'    => 1,
                'errorMsg' => $validator->errors()->all(),
            ]);
        }

        $data = $request->except('_token');

        $password = $this->getRandomString(6);

        $data['login_id'] = $this->getRandomString(10);
        $data['password'] = bcrypt($password);

        $createUserId = User::create($data)->user_id;

       	$loginIdPrefix = substr($reqData['user_type'], 0, 1);
       	$loginId = $loginIdPrefix."-".$createUserId;

        DB::table('users')
            ->where('user_id', $createUserId)
            ->update(['login_id' => $loginId]);

        return view('home/registration_success',['loginId'=>$loginId,'password'=>$password]);
        
        return response()->json([
            'error'    => 0,
            'errorMsg' => view('home/registration_success'),
            'loginId' => $loginId,
            'password' => $password
        ]);

    }

    public function logOut()
    {
        Auth::logout();
        return redirect('/');
    }
}
