<!DOCTYPE doctype html>
<html>
    <head>
    @include('includes.head')
    </head>
    <body>
        <div id="pre-loader">@include('includes.preload')</div>
        <div id="body-area" style="display: none">
            <div id="modal-area"></div>
            <div id="sidebar-area"></div>
            <div class="container-fluid container-left-margin" style="padding: 0px">
                <div class="loader" id="topLoader" style="display: none;">
                    <div class="bar"></div>
                </div>
                <div id="body">@yield('content')</div>
            </div>
        </div>
    </body>@include('includes.footer')
</html>
