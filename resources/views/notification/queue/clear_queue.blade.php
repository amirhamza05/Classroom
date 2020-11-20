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
	<div id="response"></div>
</div>
	</body>
</html>


<script type="text/javascript">
	function clearQueue(action) {
    	$.get("/clear_queue", {}, function(response) {
        	$("#response").html(response);
    	});
	}

	setInterval(function(){ clearQueue(); }, 1000);

</script>