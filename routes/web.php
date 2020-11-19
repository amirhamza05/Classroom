<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

#guest user login option
Route::get('/', "Home\home@home");
Route::get('/admin/dashboard', "Home\home@home");
Route::post('/home', 'Home\home@loadPage');


//Route::post('/home', 'Home\home@loadPage');


Route::post('/login', 'Auth\LoginController@login');
Route::post('/registration', 'Auth\LoginController@registration');
Route::get('/registration', function(){
	return view("home/registration");
});

Route::group(['middleware' => ['admin']], function () {
    Route::get('/admin1', function () {
        echo "admin dashboard ";
    });
});




Route::get('/test', "Home\home@test");
Route::get('/logout', 'Auth\LoginController@logout');

Route::get('/student/dashboard', 'Home\home@studentDashboard');
Route::get('/teacher/dashboard', 'Home\home@teacherDashboard');


