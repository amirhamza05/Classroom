<?php

namespace App\Http\Controllers\User;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\updatePassword;
use App\Http\Requests\updateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Session;
use App\Http\Controllers\Layout\LayoutController as Layout;

class LoginUserController extends Controller
{
    public function getProfile(){
       
    	return Layout::view("user.profile");
    }

    public function  updateProfileDetail(updateProfile $request){

        User::find(request()->user_id)->update(request()->all());
        return response()->json([
        'error'     => 0,
        'msg' => "Successfully updated profile"
        ]);
    }

    public function updatePassword(updatePassword $request){
        
        if(!(Hash::check(request()->get('old_password'),Auth::user()->password))){
           
            return response()->json([
                'error'     => 1,
                'msg' => "Current password does not match"
            ]);
        }
        if(strcmp(request()->get("old_password"),request()->get('new_password'))==0){
            return response()->json([
                'error'     => 1,
                'msg' => "Current & New password can not be same"
            ]);
        }
        $user = Auth::user();
        $user->password = bcrypt(request()->get('new_password'));
        $user->save();

            return response()->json([
                'error'     => 0,
                'msg' => "Password change successfully"
        ]);
    }  
}
