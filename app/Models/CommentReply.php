<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CommentReply extends Model
{

    protected $fillable = [
        'comment_reply'
    ];
    public static function boot()
    {

        parent::boot();
        static::creating(function ($commentReply) {
            $commentReply->user_id = auth()->user()->id;
            $commentReply->comment_id = request()->comment_id;
        });
        static::created(function ($commentReply) {
          
         
        });
    }
    public function comment(){
        return $this->belongsTo(Comment::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    
}

