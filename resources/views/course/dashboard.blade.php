@extends($layout)
@section('title', $courseData->name)
	<style type="text/css">
		
		.course .body{
			padding: 10px;
		}
	</style>
	<div class="course" id="course">
		@include("course.header")
		<div class="body">
			@include("course.page.dashboard")
		</div>
	</div>


