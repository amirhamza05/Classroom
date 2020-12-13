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
Route::get('/modal', function(){
    return view('includes.modal');
});
//guest group
Route::group(['middleware' => ['guest']], function () {
    Route::post('/login', 'Auth\LoginController@login');
    Route::post('/registration', 'Auth\LoginController@registration');
    Route::get('/registration', function () {
        return view("home/registration");
    });
    Route::get('/login', function () {
        return view("home/login");
    });
    Route::get('/notification_socket', function () {
        return view("notification/queue/clear_queue");
    });
});

Route::group(['prefix' => 'teacher', 'middleware' => ['teacher']], function () {
    Route::get('/dashboard', 'Home\home@teacherDashboard');
    Route::get('/logout', 'Auth\LoginController@logout');

    //profile
    Route::get('/profile', 'User\LoginUserController@getProfile');

    //---course 
    //get
    Route::get('/courses', 'Course\CoursePageController@viewCourseList');
    Route::get('/courses/create', 'Course\CoursePageController@createCourse');

    Route::group(['prefix' => 'courses/{course_id}','middleware' => ['course']], function(){
        Route::get('/', 'Course\CoursePageController@viewDashboard');
        Route::get('/dashboard', 'Course\CoursePageController@viewDashboard');
        Route::get('/setting', 'Course\CoursePageController@setting');
        
        Route::get('/teachers', 'Course\CoursePageController@viewTeacherList'); 
        Route::get('/teachers/create', 'Course\CourseController@addTeacher');
        Route::get('/teachers/delete', 'Course\CourseController@deleteTeacher');

        Route::post('setting/delete', 'Course\CourseController@delete');
    });

    //post
    Route::post('/courses/create', 'Course\CourseController@create');

    //end classroom --------------------

    Route::get('/routine', 'User\LoginUserController@getProfile');

    Route::get('/update_profile', function(){
        return view('user.update_profile');
    });
});

Route::group(['middleware' => ['admin']], function () {
    Route::get('/admin1', function () {
        echo "admin dashboard ";
    });
    Route::get('/notification_template', "Notification\NotificationController@loadTemplateList");
    Route::get('/clear_queue', "Notification\NotificationController@clearQueue");
});

Route::get('/test', "Home\home@test");

Route::get('/student/dashboard', 'Home\home@studentDashboard');
Route::get('/logout', 'Auth\LoginController@logout');