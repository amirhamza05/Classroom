@extends($layout)
<style type="text/css">
	.course .cover{
	}
	.course .cover img{
		border-radius: 10px;
		width: 100%;
		height: 250px;
	}
	.course .cover .body{
		margin-top: -215px;
		color: #000000;
		margin-left: 15px;
		position:relative;
		border-radius: 5px;
		padding-top: 0px;
		color: #ffffff;
		width: 100%;
		overflow: hidden;
	}
	.course .cover .body .td1{
		font-size: 13px;
		font-weight: bold;
		border: 1px solid rgba(1,1,1,0.1);
		background-color: rgba(1,1,1,0.1);
		padding: 7px;
		width: 110px;
		color: #dcdde1;
		text-align: right;
	}
	.course .cover .body .td2{
		font-size: 13px;
		padding: 7px;
		border: 1px solid rgba(1,1,1,0.1);
		background-color: rgba(1,1,1,0.1);
		color: #f5f6fa;
	}
  
.commnets-area{
	padding: 10px 30px; 
	margin-left: 80px;
	margin-right: 30px;
	margin-top:  -48px;
    overflow: hidden;  
	box-shadow: 0px 0px 5px rgba(0,0,0,.1); 
	background: #fff; 
	position:relative;
	border-radius: 10px;
	border: 6px #000000;
	width: (100% - 80px);
	

	}
.comment .middle-area .a .button{

	margin-left:555px;
	margin-top:-55px;
}
.comment{
    padding-bottom: 8px; 
	margin-bottom: 8px; 
	border-bottom: 1px solid #eee; 
	font-size: 14px;
	width:100%;
	}


.comment .post-info{ 
	
	position: relative; 
	
	}

.comment .post-info .middle-area{
	margin-left: -22px;
	color: solid #000000;
	font-size: 15px;
}

.comment .post-info .date{
 margin-left: -5px;
 display: inline-block; 
 color: #999; 
}


 .comment-box .send-btn button{
	margin-top:-57px;
	position:relative;
	left: 230px; 
	display: inline-block; 
  }

.comment-box .form-control{
	padding: 5px 30px;
    margin-left: 45px;
	margin-top: -40px;
    border-radius: 25px;
    border: 1px solid #eee ;
	width: 120%;
	display: inline-block; 
	resize: none;
	overflow: hidden; 
}
.card-body{
	padding: 8px 25px; 
	margin-left: 80px;
	margin-right: 30px;
	margin-top:  -48px;
	overflow: hidden; 
	box-shadow: 0px 0px 5px rgba(0,0,0,.1); 
	background: #fff; 
	position:relative;
	border-radius: 10px;
	border: 6px #000000;
	width: (100% - 80px) ;
	}
.card-body .form-control{
	margin-top:  20px;
    border: 1px solid #eee ;
	width: 100%;
	resize: none;
}
.card-body .send-btn button{
	margin-left: 780px;
	position:relative;
	display: inline-block; 
}
.reply{
	padding-bottom: 5px; 
	margin-bottom: 8px; 
	border-bottom: 1px solid #eee; 
	font-size: 12px;
	width:100%;
	
}
.reply .post-info .middle-area{
	margin-left: 55px;
	margin-top:-40px;
	color: solid #000000;
	font-size: 15px;
	
	
}
.reply .post-info .date{
 margin-left: -5px;
 display: inline-block; 
 color: #999; 
}
.reply .post-info{ 	
	position: relative; 	
}

.reply .get-reply{
	margin-left:80px;
	font-size: 14px;
	text-align: justify;
	display: inline-block;
}
.delete-update a{ 
    padding: 3px 5px 0 5px;
}
    
.delete-update #floated {
	display: inline-block;
    background-color: #535B99;
    color: red;
	cursor: pointer;
	
}
.reply-delete-update a{ 
    padding: 3px 5px 0 5px;
}
    
.reply-delete-update #floated {
	display: inline-block;
    background-color: #535B99;
    color: red;
	cursor: pointer;
	
}

</style>
<!-- <script type="text/javascript">
    function convert(){
	  var text=document.getElementById("url").value;
	  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	  var text1=text.replace(exp, "<a href='$1'>$1</a>");
	  var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
	  document.getElementById("converted_url").innerHTML=text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    }
  </script> -->
<div class="row">
	<div class="col-md-12">
		<div class="cover">
			<img src="{{asset($courseData->cover)}}" style="">
			<div class="body">
				<font style="font-size: 30px;"><b>{{$courseData->name}}</b></font>
				<table style="width: 300px;margin-top: 10px;">
					<tr>
						<td class="td1"><b>Section: </b></td>
						<td class="td2">{{$courseData->section}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Subject: </b></td>
						<td class="td2">{{$courseData->subject}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Room: </b></td>
						<td class="td2">{{$courseData->room}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Course Code: </b></td>
						<td class="td2">{{$courseData->code}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
</br>
</br>
<!-- comment/post send section start-->
      <a class="avatar" href="#">  
		<img style="border-radius: 100%;border: 1px solid #eeeeee"  width="50" hieght="50"
            src="{{asset('upload/avatars/default_avatar.png')}}"></a>
            <div class="card-body">
			<div class="card">
			@if ($errors->any())
           <div class="alert alert-danger">
             <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
            </ul>
         </div>
         @endif
             <form id="add_discussion" method="post" action=" {{url($userType.'/courses/'.$courseData->id.'/comment')}} ">                
			 @csrf
			 <div class="form-group">
	
			<textarea name="comment" rows="3" class="text-area-messge form-control"
            placeholder="Create a Post" aria-required="true" aria-invalid="false"></textarea >
            </div>
			<div style="float:right;" class=" text-center send-btn">
	       <button class="btn btn-danger">Post</button>
	       </div>
    </form>
	<script type="text/javascript">
	$(document).ready(function(){
  		$("#add_discussion").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post("{{url($userType.'/courses/'.$courseData->id.'/comment')}}" , formData, function(response) {
        		toast.success(response.msg);
        		url.load();

    		}).fail(function(error) {
        		failError.toast(error.msg);
    		});
  		});
	});
	</script>
    </div>
   </div>
<!-- comment/post send section end-->

</br>
</br>

 

<!-- comment/post display section start -->
@foreach($courseData->comments->reverse() as $comment)

<a class="avatar" href="#">  
<img style="border-radius: 100%;border: 1px solid #eeeeee"  width="50" hieght="50"
 src="{{asset('upload/avatars/default_avatar.png')}}"></a>
<div class="commnets-area ">

<div class="comment">

 <div class="post-info">

   <div class="middle-area">

   <a   style='color: #241571;font-weight: bolder;'class="name" href="#"><b>{{ $comment->user->full_name }}</b></a>
   <h6 style='color:#555b57' class="date">{{ $comment->created_at->diffForHumans()}}</h6>
  <!-- update -->
  <div style="float:right;" class='delete-update'>
  @if(Auth::user()->id == $comment->user->id) 
  <a href="{{url($userType.'/courses/'.$courseData->id.'/comment/'.$comment->id.'/update')}}">
   
  <li style="font-size:1.1em;"class="fas fa-edit"></li></a>
  @endif 
   <!-- update -->
   @if(Auth::user()->id == $comment->user->id || $courseData->isAdmin()) 
   <a href="{{url($userType.'/courses/'.$courseData->id.'/comment/'.$comment->id.'/delete')}}">
  
  <li style="font-size:1.1em;" class="fas fa-trash"></li></a>
   
   @endif 
</div>
   </div>

   </div>
   <div>
    <p style='word-break: break-all; white-space: normal;'>{!! nl2br(e($comment->comment )) !!}</p>
</div>
</div>
<!-- comment/post display section end -->


<!-- comment reply display section start-->
@if($comment->replies->count() > 0)
<button class='btn btn-link'>
<li data-toggle="collapse" data-target=".multi-collapse" 
 aria-expanded="false" aria-controls="commentbox">{{$comment->replies->count()}} class comment
 </li> </button>
	@foreach ($comment->replies as $reply)
	<div class="collapse multi-collapse" id="commentbox">
  <a class="profle" href="#">  
  <img style="border-radius: 100%;border: 1px solid #eeeeee"  width="40" hieght="40"
	  src="{{asset('upload/avatars/default_avatar.png')}}"></a>
	  
    <div class="reply" >
	 
    <div class="post-info">
   <div class="middle-area">

   <div style="float:right;" class='reply-delete-update'>

   @if(Auth::user()->id == $reply->user->id) 
   <a href="{{url($userType.'/courses/'.$courseData->id.'/comment-reply/'.$reply->id.'/update')}}">
   
  <li style="font-size:1.0em;"  class="fas fa-edit"></li></a>
  @endif 
   <!-- update -->
   @if(Auth::user()->id == $reply->user->id || $courseData->isAdmin()) 
   <a href="{{url($userType.'/courses/'.$courseData->id.'/comment_reply/'.$reply->id.'/delete')}}">
  
   <li style="font-size:1.0em;"  class="fas fa-trash"></li></a>
   
   @endif 
   </div>
   
   <a  style='color: #151E3D;font-weight:900;' class="name" href="#"><b>{{$reply->user->full_name}}</b></a>
   <h6  style='color:#555b57' class="date">{{ $reply->created_at->diffForHumans()}}</h6>
   </div>
   </div>
   <div class="get-reply">
	<p id="converted_url">{!! nl2br(e($reply->comment_reply )) !!}</p>

</div>
</div>
</div>
@endforeach
 @else
@endif
<!-- comment reply display section end -->
<!-- comment reply send section start -->
<div class="reply-section">
<img style="border-radius: 100%;border: 1px solid #eeeeee"  width="40" hieght="40" src="{{asset('upload/avatars/default_avatar.png')}}" width="40">
 
 <div class="row comment-box-main p-3 rounded-bottom">
	<div class="col-md-9 col-sm-9 col-9 pr-0 comment-box">
	<form method="post" action="{{url($userType.'/courses/'.$courseData->id.'/comment/'.$comment->id.'/comment-reply')}}" > 
	<div  class="form-group">
	 @csrf
	 <textarea  id="url" name="comment_reply" cols='10' wrap="pysical"class="text-area-messge form-control"
    placeholder="comment..." aria-required="true" aria-invalid="false"></textarea >
   <!-- <input type="text" name='comment_reply' id='comment_reply' class="form-control" placeholder="comment ...." />-->
    </div>
	<div style="float:right;" class=" text-center send-btn">
	<button class="btn btn-info">Send</button>
	</div>
	</form>
 </div>
</div>
</div>
<!-- comment reply section end-->
</div><!-- commnets-area -->
</br>
</br>

@endforeach


