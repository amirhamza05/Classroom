<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use Validator;

class NotificationController extends Controller
{
    //send notification
    public static function send($type, $data)
    {
        $validator = Validator::make($data, [
            'to'      => $type == "sms" ? 'required|regex:/^((01)[0-9\s\-\+\(\)]*)$/|min:10' : 'required|email',
            'subject' => $type == "sms" ? '' : "required",
            'body'    => 'required',
        ]);

        if (!$validator->passes()) {
            return [
                'error'    => 1,
                'errorMsg' => $validator->errors()->all(),
            ];
        }

        if ($type == "sms") {
            self::sendSms($data);
        } else {
            self::sendMail($data);
        }

        return [
            'error'    => 0,
            'errorMsg' => "OK. $type send successfully.",
        ];
    }

    public static function sendSms($smsData)
    {
        $apiUrl   = "http://api.greenweb.com.bd/api2.php";
        $apiToken = "1761ab54cced26d480c032aee1667eed";

        $apiData = [
            'to'      => $smsData['to'],
            'message' => $smsData['body'],
            'token'   => $apiToken,
        ];

        $ch = curl_init(); // Initialize cURL
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($apiData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $smsresult = curl_exec($ch);
    }

    public static function sendMail($mailData)
    {
        //\Mail::to($mailData['to'])->send(new \App\Mail\TestMail($mailData));
        \Mail::send([], [], function ($message) use ($mailData) {
            $message->from("info@coj.com", "Classroom Alert");
            $message->to($mailData['to']);
            $message->subject($mailData['subject']);
            $message->setBody($mailData['body'], 'text/html');
        });
    }

    //clear notification
    public function clearQueue()
    {

    }

}
