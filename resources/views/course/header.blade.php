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
	.box{
		background-color: #ffffff;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #E1E4E8;
		margin-bottom: 10px;
	}
	.courseBody{
		padding: 20px;
	}

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
@php
    $userType = strtolower(Auth::user()->user_type);
    $courseId = $courseData['id'];
    $urlPrefix = $userType.'/courses/'.$courseId.'';

    $courseHeader = [
        '' => [
            'icon'  => 'fas fa-home',
            'title' => 'Stream'
        ],
        '/teachers' => [
            'icon'  => 'fas fa-chalkboard-teacher',
            'title' => 'Teachers'
        ],
        '/students' => [
            'icon'  => 'fas fa-calendar-alt',
            'title' => 'Student'
        ],
        '/schedule' => [
            'icon'  => 'fas fa-user',
            'title' => 'Schedule'
        ],

        '/grade' => [
            'icon'  => 'fas fa-sign-out-alt',
            'title' => 'Grade'
        ],

        '/setting' => [
            'icon'  => 'fas fa-sign-out-alt',
            'title' => 'Setting'
        ],
    ];
@endphp
<div class="header">
		<div class="row">
			<div class="pull-left">
				<a href="{{url($userType.'/courses/'.$courseData['id'])}}" class="title">{{$courseData->name(30)}}</a>
			</div>
			<center>
			@if(Auth::user()->user_type != 'Student')
				@foreach($courseHeader as $key => $value)
               	<a href="{{url($urlPrefix.$key)}}" class="{{ request()->is($urlPrefix.$key) ? 'active' : '' }}"><span class="{{$value['icon']}}"></span> {{$value['title']}}</a>
            	@endforeach

			@else
				@unset($courseHeader['/grade'])
			    @foreach($courseHeader as $key => $value )
               	<a href="{{url($urlPrefix.$key)}}" class="{{ request()->is($urlPrefix.$key) ? 'active' : '' }}"><span class="{{$value['icon']}}"></span> {{$value['title']}}</a>
				@endforeach
			@endif
			</center>
		</div>


</div>
