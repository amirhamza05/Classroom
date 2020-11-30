@extends($layout)
@section('title', 'Dashboard')
@section('content')
	<style type="text/css">
		.course .header{
			font-size: 14px;
			border: 2px solid #eeeeee;
			height: 55px;
			padding-top: 16px;
			border-width: 0px 0px 1px 0px;
			margin-left: 2px;
			position: -webkit-sticky;position: sticky;
  			top: 0;
  			background-color: #ffffff;
  			z-index: 999;
  			overflow-y: auto;
		}
		.course .body{
			padding: 10px;
		}
	</style>
	<div class="course">
		@include("course.header")
		<div class="body">
			@include("course.page.dashboard")
		</div>
		
	</div>
	
@stop