@extends($layout)
@section('title', 'Schedule List')
<div class="course">
@include("course.header")

<style type="text/css">
	.box{
		padding-top: 5px;
		height: 120px;
		border-radius: 0px;
		box-shadow: 0px 0px 15px 1px #aaaaaa;
	}
	.leftHeader{
	}

	.box-header{
		background-color: #ffffff;
		color: #177BB6;
		font-weight: bold;
		padding: 10px;
		border-bottom: 1px solid #eeeeee;
	}
	.sendArea{
		text-align: center;
		padding: 5px;
	}
	.sendAreaInput:focus{
		outline: none;
	}
	.sendAreaInput{
		width: 90%;
		padding: 10px;
		background-color: #E3E9EA;
		border-width: 0px;
	}
</style>
<div class="body" style="margin-top: 10px;">
<div class="row">
	<div class="col-md-8">
		<div class="box">
			<div class="leftHeader">
				<div style="font-size: 20px;">{{$scheduleData->name}}</div>
				<div style="font-size: 14px;">
					<b>Start:</b> {{$scheduleData->start_time->format('d M Y H:i a')}}<br/>
					<b>End:</b> {{$scheduleData->end_time->format('d M Y H:i a')}}
				</div>
				
			</div>
		</div>
		<div class="box" style="height: 450px;padding: 0px">
			@include("course.schedule.schedule_info_body")
		</div>
	</div>
	<div class="col-md-4">
		<div class="box" style="height: 190px;box-shadow: 0px 0px 15px 1px #aaaaaa;">
			@if($scheduleData->isEnd())
				<h1>Class Is End</h1>
			@endif
			@if($scheduleData->isNotStart())
				<h1>Class Is Not Start</h1>
			@endif
			@if($scheduleData->isRunning())
				<h1>Class Is Running</h1>
				@if($scheduleData->metting_link != "")
					<a href="{{$scheduleData->metting_link}}"><button>Go To This Class</button></a>
				@endif
			@endif
		</div>
		<div class="box" style="padding: 0px;height: 370px;box-shadow: 0px 0px 15px 1px #aaaaaa;">
		 	<div class="box-header">Class Conversation</div>
		 	<div style="height: 280px;overflow-y: scroll;padding: 5px;" id="conversationBody">@include("course.schedule.conversation")</div>
		 	<div class="sendArea">
            	<div class="input-group">
              		<input type="text" id="message" autocomplete="off" name="message" placeholder="Type Message ..." class="form-control">
                  <span class="input-group-btn">
                    
                    <button onclick="sendConversation()" type="submit" class="btn btn-success btn-flat">Send</button>
                  </span>
            	</div>
		 	</div>
		</div>
	</div>
</div>

</div>

<script type="text/javascript">
	var updateConversationArea = setInterval(function(){ loadConversationArea(); }, 2000);

	function viewPresent(){
		modal.lg.open("Create Schedule");
    	loader(modal.lg.body);
    	$.get("http://127.0.0.1:8000/teacher/courses/97/schedule/9/present_graph", function(response) {
       		modal.lg.setBody(response);
       		load();
    	});
	}
</script>
