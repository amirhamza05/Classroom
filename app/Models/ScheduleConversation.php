<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleConversation extends Model
{
    protected $fillable = [
        'message'
    ];

    public static function boot()
    {

        parent::boot();
        static::creating(function ($conversation) {
            $conversation->user_id = auth()->user()->id;
            $conversation->schedule_id = request()->schedule_id;
        });
    }

    public function user(){
    	return $this->belongsTo(User::class);
    }
}
