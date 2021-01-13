<!-- App Meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta name="app-name" content="{{ config('app.name') }}"/>

<!-- App Scriopt -->
@include('includes.script')

<!-- App Stylesheet -->
@include('includes.style')

<script src="https://cdn.ckeditor.com/ckeditor5/24.0.0/classic/ckeditor.js"></script>