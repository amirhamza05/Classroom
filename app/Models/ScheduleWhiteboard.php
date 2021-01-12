<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleWhiteboard extends Model
{
    protected $fillable = [
        'board','last_update_hash'
    ];

    public static function boot()
    {
        parent::boot();
        static::creating(function ($whiteboard) {
            $whiteboard->schedule_id = request()->schedule_id;
        });
    }

}
