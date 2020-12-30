<<<<<<< HEAD
<form method = "post" action = "{{url($userType.'/courses/'.$commentData->course_id.'/comment/'.$commentData->id.'/update')}} ">                
=======
<form method="post" action="{{url('teacher/courses/'.$commentData->course_id.'/comment/'.$commentData->id.'/update')}} ">                
>>>>>>> b44a606ce08ec368186eff64208b6cd4a32dada1
     @csrf
		<div class="form-group">
	   <textarea name="comment" rows="3" class="text-area-messge form-control"
       placeholder="Create a Post" aria-required="true" aria-invalid="false">{{$commentData->comment}}</textarea >
       </div>
	   <div class="col-md-4 col-sm-4 col-1 pl-0 text-center send-btn">
	  <button class="btn btn-danger">Post</button>
	</div>
    </form>