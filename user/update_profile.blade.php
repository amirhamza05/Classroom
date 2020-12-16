
@extends($layout)
@section('title', 'Profile')
<div class='container'>
<div class="errorArea" id="errorArea">	
</div>

<h2></h2>

<form action='/teacher/profile/updatePass' method="post">
	{{ csrf_field() }}


<div class="container">

@if($errors->any())
	<div class="alert alert-danger">
	<ul>
	 @foreach($errors->all() as $error)

		<li>{{$error}}</li> 

	 @endforeach
	
	</ul>
	</div>

@endif

<div class="form-group">  
@if(session('warning'))

<strong class="alert alert-danger">{{session('warning')}}</strong></br>

@endif

@if(session('message'))
<strong class="alert alert-success">{{session('message')}}</strong></br>
@endif

<input type="text" name="" value="{{Auth::user()->full_name}}"></br>
</div>
<div class="form-group"> 
<input type="password" name="old_password" id="old_password" placeholder="Enter current password"></br>

</div>
<div class="form-group"> 
<input type="password" name="new_password" id="new_password" placeholder="Enter new password"></br>
<h6>*Required at least 6 characters, 1 lowercase, 1 uppercase and 1 number </h6>
</div>

<div class="form-group"> 
<input type="password" name="confirm_password" id="confirm_password" placeholder="Enter new password again"></br></br>
</div>
<button type="submit">Update Password</button>
</div>
</form>

</body>
</html>