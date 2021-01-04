<form id='reply_success' method = "post" action = "{{url($userType.'/courses/'.request()->course_id.'/comment-reply/'.$commentReplyData->id.'/update')}} ">                
     @csrf
		<div class="form-group">
	   <textarea name="comment_reply" rows="3" class="text-area-messge form-control"
       placeholder="Create a Post" aria-required="true" aria-invalid="false">{{$commentReplyData->comment_reply}}</textarea >
       </div>
	   <div class="col-md-4 col-sm-4 col-1 pl-0 text-center send-btn">
	  <button class="btn btn-danger">Send</button>
	</div>
    </form>
	<script type="text/javascript">
	$(document).ready(function(){
  		$("#reply_success").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post("{{url($userType.'/courses/'.request()->course_id.'/comment-reply/'.$commentReplyData->id.'/update')}}" , formData, function(response) {
        		toast.success(response.msg);
        		url.load();

    		}).fail(function(error) {
        		failError.toast(error.msg);
    		});
  		});
	});
	</script>