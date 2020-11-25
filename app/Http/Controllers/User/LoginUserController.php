<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginUserController extends Controller
{
    public function getProfile(Request $request){
    	
    	$layout = isset($request->noLayout)?'body_layout':'layout';
    	return view("user.profile",['layout'=>$layout]);
    }
}
