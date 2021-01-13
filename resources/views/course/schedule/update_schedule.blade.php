
<div id="errorMsg"></div>
<form action="{{route('schedule_update', ['course_id' => request()->course_id,'schedule_id' => $schedule->id])}}" id="update_schedule" method="post">
	@csrf
<div class="course-list">
<div class="row">
	<div class="col-md-12"><div  class="errorArea" id="errorArea"></div></div>
	<div class="col-md-4 inputLabel">Schedule Name<font color="red">*</font>:</div>
	<div class="col-md-8"><input type="text" class="input" name="name" placeholder="Schedule Name" autocomplete="off" value="{{$schedule->name}}"></div>

	<div class="col-md-4 inputLabel">
		Start Class Time<font color="red">*</font>:
	</div>
	<div class="col-md-8">
		<input type="datetime-local" value="{{$schedule->start_time->format('Y-m-d\TH:i')}}" class="input"  name="start_time" placeholder="Start Class Time" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		End Class Time<font color="red">*</font>:
	</div>
	<div class="col-md-8">
		<input type="datetime-local" class="input" value="{{$schedule->end_time->format('Y-m-d\TH:i')}}" name="end_time" placeholder="End Class Time" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Metting Link:
	</div>
	<div class="col-md-8">
		<input type="text" class="input" value="{{$schedule->metting_link}}" name="metting_link" placeholder="Enter Metting Link" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Description:
	</div>
	<div class="col-md-8">
		<textarea rows="5" class="input" name="description" placeholder="Description">{{$schedule->description}}</textarea>
	</div>
	<div class="col-md-4"></div>
	<div class="col-md-8">
		<div class="pull-right">
			<button type="submit" id="createBtn" style="margin-top: 20px;">Update Schedule</button>
		</div>
	</div>

</div>

</div>
</form>
<script type="text/javascript">
	$(document).ready(function(){
  		$("#update_schedule").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$("#errorArea").hide();
    		actionUrl = $(this).attr("action");
    		$.post(actionUrl, formData, function(response) {
        		console.log(response);
        		if (response.error == 0) {
        			modal.md.close();
        			toast.success(response.msg);
        			url.load(url.get());
        		}
        		else {
            		$("#errorArea").show();
            		$("#errorArea").html("");
           			$.each(response.errorMsg, function(index, msg) {
                		$("#errorArea").append("" + msg + "<br/>");
            		});
        		}
    		});
  		});
	});
</script>

