<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseStudent extends Model
{
	public $timestamps = false;
    protected $fillable = [
        'course_id', 'user_id','status','created_at'
    ];
}
