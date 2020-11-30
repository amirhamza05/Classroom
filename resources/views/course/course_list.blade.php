@extends($layout)
@section('title', 'Course List')
@section('content')
	<title>Course List</title>
	<style type="text/css">
		.course-list{

		}
		
		.course-list .header{
			font-weight: bold;
			font-size: 16px;
			border: 2px solid #eeeeee;
			padding: 10px 5px 10px 5px;
			height: 55px;
			border-width: 0px 0px 1px 0px;
			margin-left: 2px;
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
			color: #7f8c8d;
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
	height: 200px;
	border: 1px solid #eeeeee;
	box-shadow: 2px 2px 5px 2px #aaaaaa;
	margin-bottom: 25px;

}
.course-list .card:hover{
	box-shadow: 5px 5px 10px 3px #aaaaaa;	
}
.course-list .card img{
	height: 70px;
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
						<a href=""><span class="active"><i class="fa fa-play"></i> Current</span></a> | <a href=""><span class="normal"><i class="fa fa-clock-o"></i> Archive</span></a>
					</div>
					<div class="pull-right">
						<button class="" onclick="loadCreateCourse()"><i class="fa fa-plus"></i> Create Course</button>
					</div>
				</div>
			</div>
		</div>
		<div class="course-list-body">
			
			<div class="row">
			@foreach($courseList as $key => $value)
               <div class="col-md-3">
               		<div class="card">
               			<div class="card-header">
               				<img src="{{asset('upload/course/theme/'.$value['cover'])}}">
               				<div style="margin-top: -60px;padding-left: 5px;color: #ffffff">
               					<font size="5px;"><b>{{$value['name']}}</b></font><br/>
               					<div style="margin-top: -5px;">{{$value['code']}}</div>
               				</div>
               			</div>
               			<div class="card-body" style="margin-top: 15px;">
               				
               				Subject: {{$value['subject']}}<br/>
               				Section: {{$value['section']}}<br/>
               				Room: {{$value['room']}}<br/>
               			</div>
               			<div class="card-footer">
               				<a href="{{url('teacher/course/'.$value['id'])}}" title="View"><button style="width: 100%; background-color: #F2F6F4; color: var(--blue)"><b>View</b></button></a>
               			</div>
               		</div>
               </div>
            @endforeach
            </div>
			
		</div>
	</div>
<script type="text/javascript">
		$("a").click(function(e) {
    	});
	</script>

@stop
