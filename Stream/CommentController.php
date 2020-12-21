<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $post)
    {
       
        $validated = $request->validate([
            'comment' => 'required',
        ]);
      
        $comment = new Comment();
        $comment->course_id =  $post;
        $comment->user_id = Auth::user()->id;
        $comment->comment = $request->comment;
        $comment->save();
       
        return redirect()->back();

    }
   /*  public function delete()
    {
        Comment::find(request()->comment_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully delete comment",
        ]);
    } */
    
}
