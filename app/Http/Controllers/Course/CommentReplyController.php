<?php

namespace App\Http\Controllers\Course;
use App\Http\Controllers\Controller;
use App\Models\CommentReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Course\CommentReplyValidation;

class CommentReplyController extends Controller
{
    
    public function create(CommentReplyValidation $request)
    {
       CommentReply::create($request->all());   
       return response()->json([
        'error'     => 0,
        'msg' => "Successfully added comment"
    ]);

    }
    
    public function delete()
    {
        CommentReply::find(request()->comment_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully delete comment",
        ]);
    } 

}
