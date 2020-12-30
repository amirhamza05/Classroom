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
