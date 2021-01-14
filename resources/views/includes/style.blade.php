@php
    $styleList = [
        //<!-- Font Lib -->
        'https://fonts.googleapis.com/css?family=Exo 2', 
        'http://coderoj.com/style/lib/font-awesome/css/font-awesome.css',
        'http://fonts.googleapis.com/css?family=Open+Sans:400,700',
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://use.fontawesome.com/releases/v5.4.2/css/all.css',
        
        //<!-- Bootstrap CSS -->
        asset('lib/bootstrap/css/bootstrap.min.css'),
        
        //<!-- Custom Script -->
        asset('css/sidebar.css'),
        asset('css/home.css'),
        asset('css/modal.css'),
        asset('css/ckeditor.css'),
    ];
@endphp

@foreach($styleList as $style)
<link rel="stylesheet" type="text/css" href="{{$style}}">
@endforeach

