<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;



class Comment extends Model
{
    
    protected $fillable = [
        'comment'
    ];
    public static function boot()
    {

        parent::boot();
        static::creating(function ($comment) {
            $comment->user_id = auth()->user()->id;
            $comment->course_id = request()->course_id;
        });
        //   static::created(function ($comment) {
        //    $comment->teachers()->attach(Auth::user()->id, [
        //          'role' => 'moderator',
        //    ]);
        //  });
    }
  
    // public function isAdmin()
    // {
    //     return $this->teachers()->where(['id' => auth()->user()->id, 'role' => 'admin'])->exists();
    // }
    // public function isModerator()
    // {
    //     return $this->teachers()->where(['id' => auth()->user()->id, 'role' => 'moderator'])->exists();
    // }
    // public function teachers()
    // {
    //     return $this->belongsToMany(User::class, 'course_teachers', 'course_id', 'user_id')->withPivot(['role']);
    // }
    
   public function course()
   {
       return $this->belongsTo(Course::class);
   }
   public function user()
   {
       return $this->belongsTo(User::class);
   }
   public function replies(){
    return $this->hasMany(CommentReply::class);
}
}
