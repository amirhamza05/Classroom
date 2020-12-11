@php
    $scriptList = [
        //<!-- JQuery Lib -->
        asset('lib/jquery/jquery3.4.1.min.js'), 
        
        //<!-- Bootstrap JS -->
        asset('lib/bootstrap/js/bootstrap.min.js'),
        
        //<!-- Custom Script -->
        asset('js/script.js'),
        asset('js/preload.js'),
        asset('js/home/home.js'),
        asset('js/course/course.js'),
    ];
@endphp

@foreach($scriptList as $script)
<script type="text/javascript" src="{{$script}}"></script>
@endforeach
