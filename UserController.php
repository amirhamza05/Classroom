<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Session;
use Illuminate\Support\Facades\Validator;
use Image;

class UserController extends Controller
{
	public function updateProfile(Request $request){

	}
	//public function updateProfilePhoto(Request $request){
	//}
	public function changePassword(){
	 return view('user.update_profile');
 }
 public function updatePassword(Request $request){

   if(!(Hash::check($request->get('old_password'),Auth::user()->password))){
	   return back()->with('warning',"Your current password does not match");
   }
   if(strcmp($request->get("old_password"),$request->get('new_password'))==0){
	 return back()->with('warning',"Your current password can not be same with the new password");
   }
   $request->validate([
	 'old_password' => 'required',
	 'new_password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|same:confirm_password'
   ]);
   $user = Auth::user();
   $user->password = bcrypt($request->get('new_password'));
   $user->save();
   return back()->with('message', 'Password changed successfully');
	 
 }

 public function getProfile(){
	 return view('user.update_profile');
 }
 public function getProfileAvatar(){
 
	 return view('user.update_profile_img');
 }
public function profilePictureUpload(Request $request){
	if($request->hasFile('avatar')) {
		$avatar = $request->file('avatar');
		$filename = time() . "." . $avatar->getClientOriginalExtension();
		Image::make($avatar)->resize(250, 250)->save(public_path('/img/avatar/' . $filename));
		$user = Auth::user();
		$user->avatar = $filename;

		//Validate the avatar
		$request->validate([
		  'avatar' => 'required|image|dimensions:min_width=200,min_height=200|mimes:jpeg,jpg,png'
		]);
		$user->save();
	  }
	  return back()->with('message', 'Profile Picture Uploaded Successfully');
}
}
