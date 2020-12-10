@extends($layout)
@section('title', $courseData->name)
	<style type="text/css">
		.course .header{
			font-size: 14px;
			border-bottom: 1px solid #eeeeee;
			height: 55px;
			padding-top: 16px;
			margin-left: 0px;
			overflow-x: auto;
			position: -webkit-sticky;position: sticky;
  			top: 0;
  			background-color: #ffffff;
  			z-index: 999;
  			box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
		}
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


