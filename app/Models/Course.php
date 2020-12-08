<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Course extends Model
{
    public $timestamps  = false;
    protected $fillable = [
        'name', 'section', 'subject', 'room', 'cover', 'code', 'is_archive', 'auto_accept', 'user_id', 'created_at',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($course) {
            $coverList = [
                'Chemistry.jpg', 'Geometry.jpg', 'Honors.jpg', 'img_breakfast.jpg', 'img_read.jpg',
            ];
            $course->cover   = $coverList[rand() % count($coverList)];
            $course->user_id = Auth::user()->id;
            $course->code    = Str::random(6);
        });
        static::created(function ($course) {
            $course->teachers()->attach(Auth::user()->id, [
                'role' => 'admin',
            ]);
        });
    }

    public function getCoverAttribute($value)
    {
        return 'upload/course/theme/' . $value;
    }

    public function setUserIdAttribute($value)
    {
        return $this->attributes['user_id'] = auth()->user()->id;
    }
    //get course short name
    public function name($len = null)
    {
        $len = $len == null ? strlen($this->name) : $len;
        return substr($this->name, 0, $len) . (strlen($this->name) > $len ? "..." : "");
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'course_teachers', 'course_id', 'user_id')->withPivot(['role']);
    }

}
