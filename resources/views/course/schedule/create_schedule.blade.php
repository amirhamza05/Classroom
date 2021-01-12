
<div id="errorMsg"></div>
<form action="{{url($userType.'/courses/'.$courseData->id.'/schedule/create')}}" id="create_schedule" method="post">
	@csrf
<div class="course-list">
<div class="row">
	<div class="col-md-12"><div  class="errorArea" id="errorArea">safsdf</div></div>
	<div class="col-md-4 inputLabel">Schedule Name<font color="red">*</font>:</div>
	<div class="col-md-8"><input type="text" class="input" name="name" placeholder="Schedule Name" autocomplete="off"></div>

	<div class="col-md-4 inputLabel">
		Start Class Time<font color="red">*</font>:
	</div>
	<div class="col-md-8">
		<input type="datetime-local" class="input"  name="start_time" placeholder="Start Class Time" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		End Class Time<font color="red">*</font>:
	</div>
	<div class="col-md-8">
		<input type="datetime-local" class="input" name="end_time" placeholder="End Class Time" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Metting Link:
	</div>
	<div class="col-md-8">
		<input type="text" class="input" name="metting_link" placeholder="Enter Metting Link" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Description:
	</div>
	<div class="col-md-8">
		<textarea rows="5" class="input" name="description" placeholder="Description"></textarea>
	</div>
	<div class="col-md-4"></div>
	<div class="col-md-8">
		<div class="pull-right">
			<button type="submit" id="createBtn" style="margin-top: 20px;">Create Schedule</button>
		</div>
	</div>

</div>

</div>
</form>
<script type="text/javascript">
	$(document).ready(function(){
  		$("#create_schedule").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$("#errorArea").hide();
    		$.post(url.get(1)+"/create", formData, function(response) {
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

