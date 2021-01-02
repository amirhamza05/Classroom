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
Route::get('/modal', function () {
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
    Route::get('/api/teacher_list', 'Course\CourseController@teacherList');

    //---course
    //get
    Route::get('/courses', 'Course\CoursePageController@viewCourseList');
    Route::get('/courses/create', 'Course\CoursePageController@createCourse');

    Route::group(['prefix' => 'courses/{course_id}', 'middleware' => ['course']], function () {

        Route::get('/', 'Course\CoursePageController@viewDashboard');
        Route::post('/confirm', 'Course\CourseController@confirmRequest');
        Route::get('/dashboard', 'Course\CoursePageController@viewDashboard');
        Route::get('/teachers', 'Course\CoursePageController@viewTeacherList');
        Route::get('/students', 'Course\CoursePageController@viewStudentList');
        Route::get('/setting', 'Course\CoursePageController@setting');
        Route::get('/setting/leave', 'Course\CourseController@leave');
        
          
         //post comment
         Route::post('/comment', 'Course\CommentController@create');
         Route::get('/comment/{comment_id}/update', 'Course\CommentController@updatePage');
         Route::post('/comment/{comment_id}/update', 'Course\CommentController@update');
         Route::get('/comment/{comment_id}/delete', 'Course\CommentController@delete');
         Route::post('/comment/{comment_id}/comment-reply', 'Course\CommentReplyController@create');
        
         Route::get('/comment-reply/{comment_reply_id}/update', 'Course\CommentReplyController@updatePage');
         Route::post('/comment-reply/{comment_reply_id}/update', 'Course\CommentReplyController@update');
         Route::get('/comment_reply/{comment_reply_id}/delete', 'Course\CommentReplyController@deletePage');
     
        //course admin area
        Route::group(['middleware' => ['course.admin']], function () {

            Route::post('/teachers/create', 'Course\CourseController@addTeacher');
            Route::get('/teachers/create', 'Course\CoursePageController@viewAddTeacher');
            Route::get('/teachers/delete', 'Course\CourseController@deleteTeacher');
            Route::get('/setting/delete', 'Course\CourseController@delete');
            Route::post('/setting/archive', 'Course\CourseController@updateArchive');

            Route::get('/students/create', 'Course\CourseController@addStudent');
            Route::get('/students/delete/{user_id}', 'Course\CourseController@deleteStudent');

        });
        
       

    });

    //post
    Route::post('/courses/create', 'Course\CourseController@create');

    //end classroom --------------------

    Route::get('/routine', 'User\LoginUserController@getProfile');

    Route::get('/update_profile', function () {
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

// Route::get('/student/dashboard', 'Home\home@studentDashboard');
// Route::get('/logout', 'Auth\LoginController@logout');



Route::group(['prefix' => 'student','middleware' => ['student']], function () {
    Route::get('/dashboard', 'Home\home@studentDashboard');

    Route::get('/logout', 'Auth\LoginController@logout');

    //profile
    Route::get('/profile', 'User\LoginUserController@getProfile');
    Route::get('/api/teacher_list', 'Course\CourseController@teacherList');

    //---course
    //get
    Route::get('/courses', 'Course\CoursePageController@viewCourseList');
    Route::get('/courses/join', 'Course\CoursePageController@joinCourse');


    Route::group(['prefix' => 'courses/{course_id}', 'middleware' => ['course']], function () {

        Route::get('/', 'Course\CoursePageController@viewDashboard');
        Route::post('/confirm', 'Course\CourseController@confirmRequest');
        Route::get('/dashboard', 'Course\CoursePageController@viewDashboard');
        Route::get('/teachers', 'Course\CoursePageController@viewTeacherList');

        Route::get('/students', 'Course\CoursePageController@viewStudentList');
        Route::get('/setting', 'Course\CoursePageController@setting');
        Route::get('/setting/leave', 'Course\CourseController@leave');
        
          
         //post comment
         Route::post('/comment', 'Course\CommentController@create');
         Route::get('/comment/{comment_id}/update', 'Course\CommentController@updatePage');
         Route::post('/comment/{comment_id}/update', 'Course\CommentController@update');
         Route::get('/comment/{comment_id}/delete', 'Course\CommentController@delete');
 
         Route::post('/comment/{comment_id}/comment-reply', 'Course\CommentReplyController@create');
         Route::get('/comment-reply/{comment_reply_id}/update', 'Course\CommentReplyController@updatePage');
         Route::post('/comment-reply/{comment_reply_id}/update', 'Course\CommentReplyController@update');
         Route::get('/comment_reply/{comment_reply_id}/delete', 'Course\CommentReplyController@deletePage');
        
    });

    //post
    Route::post('/courses/join', 'Course\CourseController@join');


    //end classroom --------------------

    Route::get('/routine', 'User\LoginUserController@getProfile');

    Route::get('/update_profile', function () {
        return view('user.update_profile');
    });
});
