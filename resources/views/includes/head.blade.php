<!-- App Meta -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<meta name="csrf-token" content="{{ csrf_token() }}" />
<meta name="app-name" content="{{ config('app.name') }}"/>

<!-- App Scriopt -->
@include('includes.script')

<!-- App Stylesheet -->
@include('includes.style')

	<script type="text/javascript" src="https://rawrfl.es/jquery-drawr/jquery.drawr.combined.js?v=2"></script>
