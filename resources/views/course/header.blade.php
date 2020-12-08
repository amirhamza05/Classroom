<style type="text/css">
	.course a{
		text-align: center;
		padding: 15px 20px 15px 20px;
		color: #7f8c8d;
	}
	.course .active{
		border-bottom: 5px solid var(--blue);
		color: var(--blue)!important;
		font-weight: bold;
	}
	.course .header .title{
		font-weight: bold;
		font-size: 18px;

	}
</style>
 
 <script type="text/javascript">
 	var _courseId = {{$courseData->id}};
 	//var _url = "{{Request::url()}}";
 </script>

<div class="header">
		<div class="row">
			<div class="pull-left">
				<a href="{{url('/teacher/courses/'.$courseData['id'])}}" class="title">{{$courseData->name(30)}}</a>
			</div>
			<center>
				<a href="{{url('/teacher/courses/'.$courseData['id'])}}" class="active"><span class="fas fa-chalkboard-teacher"></span> Stream</a>
				<a href="{{url('/teacher/courses/'.$courseData['id'].'/teachers')}}"><span class="fas fa-chalkboard-teacher"></span> Teacher</a>
				<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Student</a>
				<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Schedule</a>
				<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Grade</a>
				<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Setting</a>
			</center>
		</div>
		 
		
</div>
