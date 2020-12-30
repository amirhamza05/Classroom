<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    protected $appends = ['avatar'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login_id', 'user_type', 'full_name', 'nick_name', 'email', 'phone', 'password', 'phone_verified', 'email_verified'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function getAvatarAttribute(){
        $avatar = [
            'https://upload.wikimedia.org/wikipedia/commons/9/90/Willy-Nilly_My_Passport_Size_Photo.jpg',
            'https://1.bp.blogspot.com/-gLi6t7hfRP8/XNRN_Z64zvI/AAAAAAAABR4/yyeUX55YflAgseHOFKLF7sfLGirckaR-ACLcBGAs/s640/Sandip_pic.png',
            'https://image.winudf.com/v2/image/Y29tLndoeWFwcHMucGFzc3BvcnRwaG90by5waG90b2VkaXRvcl9zY3JlZW5fM18xNTI3NDkzMTM0XzA3OA/screen-3.jpg?fakeurl=1&type=.jpg',
            'https://4.bp.blogspot.com/-tKHyh7sDP0s/T_xj5oV6-tI/AAAAAAAACz4/Ylps7Lrwlik/s1600/Sachin.jpg',
            'https://nilambar.net/wp-content/uploads/2008/09/first.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/3/32/Passport_Size_Image_of_Nouman.jpg',
            'https://saifulbinakalam.files.wordpress.com/2017/10/saiful-bin-a-kalam-passport-size-photo.jpg',
        ];
        return $avatar[$this->id%count($avatar)];
    }
    public function isTeacher()
    {
        return $this->user_type == "Teacher" ? 1 : 0;
    }
    public function isStudent()
    {
        return $this->user_type == "Student" ? 1 : 0;
    }
    public function isAdmin()
    {
        return $this->user_type == "Student" ? 1 : 0;
    }

    public function courses()
    {
        if($this->isStudent()) 
             return $this->belongsToMany(Course::class, 'course_students', 'user_id','course_id')->withPivot(['status']);
        return $this->belongsToMany(Course::class, 'course_teachers', 'user_id','course_id')->withPivot(['role']);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function replies(){
        return $this->hasMany(CommentReply::class );
    }

}
