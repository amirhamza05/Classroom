
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<script type="text/javascript" src="http://127.0.0.1:8000/lib/jquery/jquery3.4.1.min.js"></script>
	<script type="text/javascript" src="http://127.0.0.1:8000/lib/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" 
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	<script type="text/javascript" src="http://127.0.0.1:8000/js/script.js"></script>
	<link rel="stylesheet" type="text/css" href="http://127.0.0.1:8000/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="http://127.0.0.1:8000/css/whiteboard.css">
</head>
<body>
<style type="text/css">
</style>
		<div class="left-area">

			@for($i=1; $i<=10; $i++)
			<b style="color: #666666">{{$i}}</b> <img src="{{$scheduleData->getBoard()}}" class="boardImg"><br/>
			@endfor
		</div>
		<img  id='pencil' src="http://127.0.0.1:8000/img/icon/pencil.png" style="display: none">
		<canvas id="myCanvas" style="margin-left: 220px;" width="1080px" height="580px"></canvas>

		
		<div class="footerToolArea">
			<div style="float: left;margin-top: 30px;margin-left: 15px;">
				<center><button class="addBtn" style="width: 190px;">Add New Page</button></center>
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
				<center><input type="range" value="1" style="width: 220px" id="pencilLength" min="0" max="20">Height</center>
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
<img style="display: none;" id="scream" src="{{$scheduleData->getBoard()}}" alt="The Scream">

<script type="text/javascript" src="http://127.0.0.1:8000/js/whiteboard/whiteboard.js"></script>

</body>
</html>
