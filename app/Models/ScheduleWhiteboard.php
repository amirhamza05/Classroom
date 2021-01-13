<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ScheduleWhiteboard extends Model
{
    protected $table    = "schedule_whiteboard";
    protected $fillable = [
        'board_hash', 'last_update_hash',
    ];

    protected $appends = [
        'board',
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($whiteboard) {
            $whiteboard->schedule_id = request()->schedule_id;
        });
        static::created(function ($whiteboard) {
            $whiteboard->board_hash = md5(uniqid()) . "-" . md5($whiteboard->id) . "-" . md5(Str::random(15));
            $whiteboard->update();
        });
    }

    public function getBoardAttribute()
    {
        return 'upload/whiteboard/' . $this->board_hash . ".png";
    }

    public function getBoard()
    {
        $board = File::exists($this->board) ? File::get($this->board) : File::get("upload/whiteboard/default.png");
        return 'data:image/png;base64,' . base64_encode($board);
    }

}
