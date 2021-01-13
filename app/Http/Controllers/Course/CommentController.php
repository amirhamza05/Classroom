<?php

namespace App\Http\Controllers\Course;
use App\Http\Controllers\Controller;
use App\Models\Comment;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\Course\CommentValidation;


class CommentController extends Controller
{
    public function create(CommentValidation $request)
    {
       Comment::create($request->all());   
       return response()->json([
        'error'     => 0,
        'msg' => "Successfully add comment"
    ]);

    }
    
    public function delete()
    {
        Comment::find(request()->comment_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully delete comment",
        ]);
       
    }
    public function update(CommentValidation $request)
    {
        Comment::find(request()->comment_id)->update($request->all());

        // $comment = Comment::where('id', $r)->update$request->all());
        return response()->json([
        'error'     => 0,
        'msg' => "Successfully edited comment"
    ]);
       
    } 
    public function updatePage()
    {
        $commentData = Comment::where(['id'=>request()->comment_id])->first();
        // return view('/updateComment',[$commentData]);
        return view("course.page.updateComment", [
            'commentData' => $commentData,
        ]);
    }
}
