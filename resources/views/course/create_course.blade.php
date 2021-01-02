<div id="errorMsg"></div>
<form action="{{url($userType.'/courses/create')}}" id="create_course" method="post">
	@csrf
<div class="course-list">
<div class="row">
	<div class="col-md-4 inputLabel">Course Name<font color="red">*</font>:</div>
	<div class="col-md-8"><input type="text" class="input" name="name" placeholder="Course Name" autocomplete="off"></div>

	<div class="col-md-4 inputLabel">
		Section:
	</div>
	<div class="col-md-8">
		<input type="text" class="input"  name="section" placeholder="Section" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Subject:
	</div>
	<div class="col-md-8">
		<input type="text" class="input" name="subject" placeholder="Subject" autocomplete="off">
	</div>
	<div class="col-md-4 inputLabel">
		Room:
	</div>
	<div class="col-md-8">
		<input type="text" class="input" name="room" placeholder="Room" autocomplete="off">
	</div>
	<div class="col-md-4"></div>
	<div class="col-md-8">
		<div class="pull-right">
			<button type="submit" id="createBtn" style="margin-top: 20px;">Create Course</button>
		</div>
	</div>

</div>

</div>
</form>
<script type="text/javascript">
	$(document).ready(function(){
  		$("#create_course").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post(url.get(1)+"/create", formData, function(response) {
        		if (response.error == 0) {
        			modal.md.close();
        			toast.success(response.msg);
        			url.load(url.get(1)+"/"+response.course_id);
        		}
        		else {
            		$("#loginResponse").html(response.errorMsg);
        		}
    		});
  		});
	});
</script>
