<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class Schedule extends Model
{
    public $timestamps  = false;
    protected $fillable = [
        'course_id', 'name', 'description', 'start_time', 'end_time', 'metting_link', 'board','board_real_time_hash','created_at', 'updated_at',
    ];
    protected $casts      = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($schedule) {
            $schedule->course_id = request()->course_id;
        });
        static::created(function ($schedule) {
            $schedule->board = md5("{md5(uniqid())}-{md5($schedule->id)}-{Str::random(15)}").".png";
            $schedule->update();
        });
    }

    public function diffTimeFormate($seconds)
    {
        $init    = $seconds;
        $hours   = floor($init / 3600);
        $minutes = floor(($init / 60) % 60);
        $seconds = $init % 60;

        $hours = $hours < 10 ? "0".$hours : $hours;
        $minutes = $minutes < 10 ? "0".$minutes : $minutes;
        $seconds = $seconds < 10 ? "0".$seconds : $seconds;
        return "$hours:$minutes:$seconds";
    }

    public function getBoardAttribute($value)
    {
        return 'upload/whiteboard/'.$value;
    }

    public function getBoard(){
        $board = File::exists($this->board) ? File::get($this->board) : File::get("upload/whiteboard/default.png");
        return 'data:image/png;base64,'.base64_encode($board);
    }

    public function getLength()
    {
        return $this->diffTimeFormate($this->start_time->diffInSeconds($this->end_time));
    }

    public function getTimer(){
    	if($this->isRunning()){
    		return Carbon::now()->diffInSeconds($this->end_time);
    	}
    	else if($this->isNotStart()){
    		return Carbon::now()->diffInSeconds($this->start_time);
    	}
    	return 0;
    }

    public function isRunning()
    {
        return Carbon::now()->between($this->start_time, $this->end_time);
    }
    public function isNotStart()
    {
        return $this->start_time > Carbon::now();
    }

    public function isEnd()
    {
        return $this->end_time < Carbon::now();
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function conversations()
    {
        return $this->hasMany(ScheduleConversation::class);
    }
    public function whiteboards(){
        return $this->hasMany(ScheduleWhiteboard::class);
    }
}
