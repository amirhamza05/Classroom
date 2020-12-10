<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginUserController extends Controller
{
    public function getProfile(){
    	return view("user.profile");
    }
}
