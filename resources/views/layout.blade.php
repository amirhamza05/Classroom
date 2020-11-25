<!DOCTYPE doctype html>
<html>
    <head>
        @include('includes.head')
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        @include('includes.sidebar')
        <div class="container-fluid container-left-margin" id="body">
          @yield('content')
        </div>
    </body>
</html>
