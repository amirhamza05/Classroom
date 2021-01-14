@extends($layout)
@section('title', 'Teachers in '.$courseData->name)
<style type="text/css">
	.course-list .input {
    padding: 12px;
    width: 100%;
    border-radius: 5px;
    font-size: 14px;
    border: 1px solid #aaaaaa;
    margin-bottom: 5px;

}
.course-list .inputLabel{
    font-weight: bold;
    padding-top: 12px;
    padding-bottom: 5px;
    text-align: right;
}

.course-list .input:focus {
    outline: none;
}
</style>

<div class="course">
	@include("course.header")

	<div class="courseBody">
		@if($courseData->isAdmin())
		<div class="box">
			<form action="{{url()->current().'/update'}}" id="update_course" method="post">
	@csrf
<div class="course-list">
<div class="row">
	<div class="col-md-2 inputLabel">Course Name<font color="red">*</font>:</div>
	<div class="col-md-10"><input type="text" value="{{$courseData->name}}" class="input" name="name" placeholder="Course Name" autocomplete="off"></div>

	<div class="col-md-2 inputLabel">
		Section:
	</div>
	<div class="col-md-10">
		<input type="text" class="input" value="{{$courseData->section}}"  name="section" placeholder="Section" autocomplete="off">
	</div>
	<div class="col-md-2 inputLabel">
		Subject:
	</div>
	<div class="col-md-10">
		<input type="text" class="input" value="{{$courseData->subject}}" name="subject" placeholder="Subject" autocomplete="off">
	</div>
	<div class="col-md-2 inputLabel">
		Room:
	</div>
	<div class="col-md-10">
		<input type="text" value="{{$courseData->room}}" class="input" name="room" placeholder="Room" autocomplete="off">
	</div>
	<div class="col-md-4"></div>
	<div class="col-md-8">

	</div>
	<div class="pull-right">
		<button type="submit" class="btn-success" style="margin-top: 20px;"><i class="fas fa-edit"></i> Update Course Data</button>
	</div>
</div>

</div>

</form>

<script type="text/javascript">
	$(document).ready(function(){
  		$("#update_course").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post(url.get(1)+"/update", formData, function(response) {
        		if (response.error == 0) {
        			toast.success(response.msg);
        		}
        		else {
            		$("#loginResponse").html(response.errorMsg);
        		}
    		});
  		});
	});
</script>


		</div>
@endif
		<div class="box" style="border: 1px solid red">
			<div style="border-bottom: 1px solid #eeeeee;padding-bottom: 15px;margin-bottom: 15px;">
				<div class="pull-right"><button onclick="leaveCourse()"><i class="fa fa-sign-out"></i> Leave Course</button></div>
				<b>Leave this Course</b><br/>
				Once you delete a course, there is no going back. Please be certain.
			</div>
			@if($courseData->isAdmin())
			<div style="border-bottom: 1px solid #eeeeee;padding-bottom: 15px;margin-bottom: 15px;">
				<div class="pull-right"><button archive="{{$courseData->is_archive}}" class="{{$courseData->is_archive?'btn-success':''}}" onclick="archiveCourseAction({{$courseData->is_archive}})"><i class="fa fa-sign-out"></i> {{$courseData->is_archive?'Add Current':'Add Archive'}}</button></div>
				<b>Add {{$courseData->is_archive?"Current this course":"Archive this course"}}</b><br/>
				{{$courseData->is_archive?"If you select current then you can not see this course in current course":"If you select archive then you can see this course in archive course"}}

			</div>
			<div>
				<div class="pull-right"><button onclick="deleteCourse()"><i class="far fa-trash-alt"></i> Delete Course</button></div>
				<b>Delete this Course</b><br/>
				Once you delete a course, there is no going back. Please be certain.
			</div>
			@endif
		</div>
	</div>
</div>
