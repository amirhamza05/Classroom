@extends($layout)
@section('title', 'Course List')
<style type="text/css">
	
		.course-list{

		}

		.course-list .header{
			font-weight: bold;
			font-size: 16px;
			border-bottom: 1px solid #eeeeee;
			padding: 10px 5px 10px 5px;
			height: 55px;
			margin-left:0px;
			position: -webkit-sticky;position: sticky;
  			top: 0;
  			background-color: #ffffff;
  			z-index: 999;
		}


		.course-list-body{
			padding: 15px 5px 15px 5px;
		}

		.course-list a{
			text-decoration: none;
		}
		.course-list .active {
			color: #000000;
		}

		.course-list .normal{
			font-size: 13px;
			color: #95a5a6;
		}
		.course-list .normal {
			color: #aaaaaa;
		}
button {
    background-color: var(--red);
    color: #ffffff;
    padding: 8px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
}

 button:hover {
    opacity: 0.8;
    color: #ffffff;
}

 button:disabled {
    opacity: 0.8;
    color: #ffffff;
}

button:focus {
    outline: none;
}

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
.course-list .card{
	padding: 2px;
	height: 205px;
	border: 1px solid #eeeeee;
	box-shadow: 2px 2px 5px 2px #aaaaaa;
	margin-bottom: 25px;
	background-color: #ffffff;
	overflow: hidden;

}
.course-list .card:hover{
	box-shadow: 5px 5px 10px 3px #aaaaaa;
}
.course-list .card img{
	height: 75px;
	width: 100%;
}
.course-list .card-body{
	height: 85px;
	padding: 3px;
}
</style>
	<div class="course-list">
		<div class="header">
			<div class="row">
				<div class="col-md-12">
					<div class="pull-left" style="margin-top: 7px;">
						<a href="/{{$userType}}/courses"><span class="{{!(isset(request()->request_courses)|isset(request()->archive_course))?'active':'normal'}}"><i class="fa fa-play"></i> Current</span></a> | <a href="/{{$userType}}/courses?archive_course=1"><span class="{{isset(request()->archive_course)?'active':'normal'}}"><i class="fa fa-clock-o"></i> Archive</span></a> | <a href="/{{$userType}}/courses?request_courses=1"><span class="{{isset(request()->request_courses)?'active':'normal'}}"><i class="fa fa-clock-o"></i> Requset</span></a>
					</div>
					@if($userType  == 'teacher')
					<div class="pull-right">
						<button class="" onclick="loadCreateCourse()"><i class="fa fa-plus"></i> Create Course</button>
					</div>
					@endif
					@if($userType  == 'student')
					<div class="pull-right">
					<a href="{{url($userType.'/courses/join')}}">
						<button class="" ><i class="fa fa-plus"></i> Join Course</button></a>
					</div>
					@endif
				</div>
			</div>
		</div>



		<div class="course-list-body">
			<div class="row">
			@foreach($courseList as $key => $data)
               <div class="col-md-3 col-sm-4">
               		<div class="card">
               			<div class="card-header">
               				<img src="{{asset($data->cover)}}">
               				<div style="margin-top: -65px;padding-left: 5px;color: #ffffff">
               					

               					<font size="5px;"><b>{{$data->name(16)}}</b></font><br/>
               					<div style="margin-top: -5px;">{{$data->code}}</div>
               				</div>
               			</div>
               			<div class="card-body" style="margin-top: 20px;">
               				<center>
               					@if($data->isTeacher())
               						@if($data->isAdmin())
               							<span class="label label-success"><i class="fas fa-user-shield"></i> Admin</span>
               						@elseif($data->isModerator())
               							<span class="label label-info"><i class="fas fa-user-cog"></i> Moderator</span>
               						@endif
               					@endif
               				</center>
               				Subject: {{$data->subject}}<br/>
               				Section: {{$data->section}}<br/>
               				Room: {{$data->room}}<br/>
               				
               			</div>
               			
               			<div class="card-footer">
               				<a href="{{url($userType.'/courses/'.$data->id)}}" page-title='{{$data->name}}' title="View"><button style="width: 100%; background-color: #F2F6F4; color: var(--blue)"><b>View</b></button></a>
               			</div>
               		</div>
               </div>
            @endforeach
            </div>
			
		</div>
	</div>
