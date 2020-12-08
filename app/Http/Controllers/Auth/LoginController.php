<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

//custom added
use App\Http\Controllers\Notification\NotificationController as Notification;
use App\Http\Controllers\Notification\Template\NotificationTemplateController as NotificationTemplate;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//custom controllers
use Validator;

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

    public function getRandomString($len = 6)
    {
        $characters   = '0123456789abcdefghijklmnopqrstuvwxyz';
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
            'phone'     => 'required|regex:/^((01)[0-9\s\-\+\(\)]*)$/|min:10',
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

        $createUserId = User::create($data)->id;

        $loginIdPrefix = substr($reqData['user_type'], 0, 1);
        $loginId       = $loginIdPrefix . "-" . $createUserId;

        DB::table('users')
            ->where('id', $createUserId)
            ->update(['login_id' => $loginId]);

        $nickName = $data['nick_name'];

        $notificationTemplate = NotificationTemplate::set('welcome', [
            'nick_name' => $nickName,
            'login_id'  => $loginId,
            'password'  => $password,
        ]);

        Notification::send('mail', [
            'to'        => $data['email'],
            'from_name' => $notificationTemplate['from_name'],
            'subject'   => $notificationTemplate['subject'],
            'body'      => $notificationTemplate['mail_body'],
        ]);

        Notification::send('sms', [
            'to'   => $data['phone'],
            'body' => $notificationTemplate['sms_body'],
        ]);

        return view('home/registration_success', ['loginId' => $loginId, 'password' => $password]);

        return response()->json([
            'error'    => 0,
            'errorMsg' => view('home/registration_success'),
            'loginId'  => $loginId,
            'password' => $password,
        ]);

    }

    public function logOut()
    {
        Auth::logout();
        return redirect('/');
    }
}
