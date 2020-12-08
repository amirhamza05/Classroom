<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">

<!-- App Info -->
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta name="app-name" content="{{ config('app.name') }}"/>

<!-- Font Style -->
 <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.4.2/css/all.css'>
 <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>

<!-- JQuery Lib -->
<script type="text/javascript" src="http://coderoj.com/style/lib/jquery/jquery.min.js"></script>

<!-- Bootstrap Lib -->
<link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="http://coderoj.com/style/lib/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="http://coderoj.com/style/lib/font-awesome/css/font-awesome.css">
<script type="text/javascript" src="http://coderoj.com/style/lib/bootstrap/js/bootstrap.min.js"></script>

<link href="https://fonts.googleapis.com/css?family=Exo 2" rel="stylesheet">
<script type="text/javascript" src="{{asset('js/script.js')}}"></script>
<script type="text/javascript" src="{{asset('js/home/home.js')}}"></script>
<script type="text/javascript" src="{{asset('js/course/course.js')}}"></script>

<link rel="stylesheet" type="text/css" href="{{asset('css/sidebar.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/home.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/modal.css')}}">
<script type="text/javascript">
	var _token = $('meta[name="csrf-token"]').attr('content');
</script>