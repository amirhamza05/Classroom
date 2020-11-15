<style type="text/css">
	.loginArea {
    	margin-top: 40px;
	}
	.errorArea{
		color: red;
		border: 1px solid red;
		display: none;
		margin-bottom: 10px;
		padding: 10px;
	}
</style>
<div class="errorArea" id="errorArea">
	
</div>
<form action='/registration' method="post">
	{{ csrf_field() }}
<div class="loginInputLabel">You Are</div>
<select id="user_type" name="user_type">
	<option>Student</option>
	<option>Teacher</option>
</select>
<div class="loginInputLabel">Full Name</div>
<input type="text" name="full_name" id="full_name" placeholder="Enter Full Name">
<div class="loginInputLabel">Nick Name</div>
<input type="text" name="nick_name" id="nick_name" placeholder="Enter Nick Name">
<div class="loginInputLabel">Email</div>
<input type="email" name="email" id="email" placeholder="Enter Email">
<div class="loginInputLabel">Phone</div>
<input type="number" name="phone" id="phone" placeholder="Enter Mobile Number">
<!-- <input type="submit" name=""> -->
</form>
<button id="registrationBtn" class="loginBtn btnBlue" onclick="registration()">Register New Account</button>
<center>Already have account? <a href="javascript:loadLoginArea('login');"><u><b>Login Here</b></u></a></center>
