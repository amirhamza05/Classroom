<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;



class Comment extends Model
{
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
