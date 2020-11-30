<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseTeacher extends Model
{
	public $timestamps = false;
    protected $fillable = [
        'course_id', 'user_id','role'
    ];
}
