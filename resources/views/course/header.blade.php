<style type="text/css">
	.course a{
		text-align: center;
		padding: 15px 20px 15px 20px;
		color: #7f8c8d;
	}
	.active{
		border-bottom: 5px solid var(--blue);
		color: var(--blue)!important;
		font-weight: bold;
	}
</style>
<div class="header">
		<a href="{{url('/teacher/course/'.$courseData['id'])}}" class="active"><span class="fas fa-chalkboard-teacher"></span> Stream</a>
		<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Teacher</a>
		<a href="{{url('/teacher/course/'.$courseData['id'])}}"><span class="fas fa-chalkboard-teacher"></span> Student</a>
</div>
