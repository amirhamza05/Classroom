<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminPageController extends Controller
{
    public function dashboard()
    {
        return view('teacher.dashboard');
    }
    public function templatePage()
    {
        
    }

    //return
    public function adminList($data){
    	//read database

    	return $res;
    }
}
