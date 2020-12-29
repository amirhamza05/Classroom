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
    
    public function deletePage()
    {
       // dd($request->all());
        CommentReply::find(request()->comment_reply_id)->delete();
        return response()->json([
            'error' => 0,
            'msg'   => "Successfully delete comment",
        ]);
    } 
    public function update(CommentReplyValidation $request)
    {
        CommentReply::find(request()->comment_reply_id)->update($request->all());

        // $comment = Comment::where('id', $r)->update$request->all());
        return response()->json([
        'error'     => 0,
        'msg' => "Successfully edited comment"
    ]);
       
    } 
    public function updatePage()
    {
        // dd(request()->all());
        $commentReplyData = CommentReply::where(['id'=>request()->comment_reply_id])->first();
       // dd(request()->all());
        // return view('/updateComment',[$commentData]);
        return view("course.page.updateCommentReply", [
            'commentReplyData' => $commentReplyData,
        ]);
    }


}
