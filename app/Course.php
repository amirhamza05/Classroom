<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
	public $timestamps = false;
    protected $fillable = [
        'name', 'section', 'subject', 'room', 'cover', 'code', 'is_archive', 'auto_accept', 'user_id','created_at'
    ];
}
