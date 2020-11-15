<style type="text/css">
	.loginArea {
    	margin-top: 130px;
	}
</style>
<div id="loginResponse"></div>
<div class="loginInputLabel">Login Id</div>
<input type="text" id="login_id" name="login_id" placeholder="Enter Login Id">
<div class="loginInputLabel">Password</div>
<input type="password" name="password" id="password" placeholder="Enter Password">
<div class="pull-right"  style="margin-bottom: 0px;">
	<a id="myLink" href="javascript:MyFunction();"><i class="fa fa-home" aria-hidden="true"></i><b>
 Forgot Password?</b></a>
</div>
<button class="loginBtn btnRed" id="loginBtn" onclick="login()">Login Class Room</button>
<center>Not registred? <a id="loadRegistrationBtn" href="javascript:loadLoginArea('registration');"><u><b>Create an account</b></u></a></center>
