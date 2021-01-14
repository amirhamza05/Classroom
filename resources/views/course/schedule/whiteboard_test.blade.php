
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<script type="text/javascript" src="/lib/jquery/jquery3.4.1.min.js"></script>
	<script type="text/javascript" src="/lib/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" 
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	<script type="text/javascript" src="/js/script.js"></script>
	<link rel="stylesheet" type="text/css" href="/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/css/whiteboard.css">
</head>
<body>
<style type="text/css">
	.pageList{
		cursor: pointer;
		padding-top: 10px;
		margin-bottom: 2px;
	}
	.pageList:hover{
		background-color: #eeeeee;
		border-radius: 0px 5px 5px 0px;
	}
	.active{
		background-color: #dddddd;
		border-radius: 0px 5px 5px 0px;
	}
</style>
<script type="text/javascript">
	var boardHash = "{{$whiteboardData->board_hash}}";
	var isTeacher = {{auth()->user()->isTeacher()}};

</script>

		<div class="left-area">
	<?php 
		$whiteboards = $scheduleData->whiteboards()->get();
	?>
		@foreach($whiteboards as $key => $whiteboard)
		<div class="pageList {{$whiteboard->board_hash == request()->board?'active':''}}" onclick="goCanvasPage('{{$whiteboard->board_hash}}')">
		<b style="color: #666666">{{$key+1}}</b> <img src="{{$whiteboard->getBoard()}}" class="boardImg"><br/>
		</div>
		@endforeach

		</div>
		<img  id='pencil' src="/img/icon/pencil.png" style="display: none">
		<canvas id="myCanvas" style="margin-left: 220px;" width="1080px" height="580px"></canvas>
		@if(auth()->user()->isTeacher())
		<div class="footerToolArea">
			<div style="float: left;margin-top: 30px;margin-left: 15px;">
				<center><button onclick="addNewPage()" class="addBtn" style="width: 190px;">Add New Page</button></center>
			</div>
			<div id="toolbar" style="float: left; margin-left: 50px;">
				<ul>
					<li tool="pencil" class="active" title="Pencil"><i class="fas fa-pencil-alt"></i></li>
					<li tool="eraser" title="Eraser"><i class="fa fa-eraser"></i></li>
					<input type="file" id="addImage" style="display: none"  accept="image/*" onchange="loadFile(event)">
					<li tool="image"><i class="far fa-image" title="Image"></i></li>
					<li tool="reset" title="Reset"><i class="fas fa-sync"></i></li>
				</ul>
			</div>
			<div style="float: left;text-align: center;margin-left: 110px;margin-top: 15px;width: 300px;">
				<center><input type="range" value="1" style="width: 220px" id="pencilLength" min="1" max="20"><div id="pencilLenVal">2</div></center>
			</div>
			<div id="controls" style="text-align: center;margin-left: 20px;float: left;width: 300px;">
					<ul id="themeList" style="">
						<li class="theme1 selected"></li>
						<li class="theme2"></li>
						<li class="theme3"></li>
						<li class="theme4"></li>
						<li class="theme5"></li>
						<li class="theme6"></li>
						<li class="theme7"></li>
						<li class="theme8"></li>
						<li class="theme2"></li>
						<li class="theme3"></li>
						<li class="theme4"></li>
						<li class="theme5"></li>
						<li class="theme6"></li>
						<li class="theme3"></li>
						<li class="theme4"></li>
						<li class="theme4"></li>
					</ul>
			</div>
		</div>
		@endif
<img style="display: none;" id="scream" src="{{$whiteboardData->getBoard()}}" alt="The Scream">

<script type="text/javascript" src="{{asset('js/whiteboard/whiteboard.js')}}"></script>

</body>
</html>

<!-- <form action="http://127.0.0.1:8000/teacher/courses/97/schedule/15/whiteboard/save" method="post">
	@csrf
	<input type="text" value="cf960a82f279ed77e52ae11772a47aff-c9f0f895fb98ab9159f51fd0297e236d-4cd3d7e8b00b9131ad0b38639a396715"  name="board_hash">
	<input type="text" value="sdafadf" name="board">
	<button type="submit">Submit</button>
</form>
 -->