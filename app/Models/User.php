<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login_id', 'user_type', 'full_name', 'nick_name', 'email', 'phone', 'password', 'phone_verified', 'email_verified',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

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
        return $this->belongsToMany(Course::class, 'course_teachers', 'user_id','course_id')->withPivot(['role']);
    }

}
