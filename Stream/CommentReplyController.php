<?php

namespace App\Http\Controllers;

use App\Models\CommentReply;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class CommentReplyController extends Controller
{
    
    public function store(Request $request, $comment)
    {
       $this->validate($request, [
           'comment_reply' => 'required'
        ]);

        $commentReply = new CommentReply();
        $commentReply->user_id = Auth::user()->id;
        $commentReply->comment_id = $comment;
        $commentReply->comment_reply = $request->comment_reply;
        $commentReply->save();

        return redirect()->back();

    }
}
