<div class="row">
             
     @csrf
		<div class="form-group">
	   <textarea name="comment_reply" id="comment_reply_{{$commentReplyData->id}}" rows="3" class="text-area-messge form-control"
       placeholder="Create a Post" aria-required="true" aria-invalid="false">{{$commentReplyData->comment_reply}}</textarea >
       </div>
	   <div class="pull-right">
	  <button class="btn btn-danger" onclick="updateCommentReply({{$commentReplyData->id}})">Update Comment Reply</button>
	</div>
  </div>
