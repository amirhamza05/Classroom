<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<div class="container">

		<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.4.2/css/all.css'>
		<!-- JQuery Lib -->
	<script type="text/javascript" src="http://coderoj.com/style/lib/jquery/jquery.min.js"></script>
	<!-- Bootstrap Lib -->
	<link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="http://coderoj.com/style/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="http://coderoj.com/style/lib/font-awesome/css/font-awesome.css">
	<script type="text/javascript" src="http://coderoj.com/style/lib/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="http://coderoj.com/style/lib/editarea_0_8_2/edit_area/edit_area_full.js"></script>
	<link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/home.css">
	<script type="text/javascript" src="assets/js/home/home.js"></script>
<script type="text/javascript">
	var _token = "{{ csrf_token() }}";
</script>
<div class="row">
	<div class="col-md-8" style="text-align: center;">
		<div class="homeLeft text-center">
			<div class="homeTextArea">
				<span class="doubleTxtRed welcomeTxt">EduHome</span>
				<div class="homeTitleArea">
					<span class="doubleTxtBlue titleTxt">Virtual </span>
					<span class="doubleTxtBlue titleTxt">Class </span>
					<span class="doubleTxtBlue titleTxt">Room</span>
				</div>
			</div>
			<img style="width: 90%" src="assets/file/site/studying.svg">
		</div>
	</div>
	<div class="col-md-4">
		<div class="loginArea">
			<div class="inputArea" id="loginArea">
				@include("home.login")
			</div>
		</div>
	</div>
</div>

	</div>
</body>
</html>

{{isset($variable) ? $variable : ''}}