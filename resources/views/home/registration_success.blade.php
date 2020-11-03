<style type="text/css">
	.loginArea {
    	margin-top: 80px;
	}
	i{
		color: #67B869;
		font-size: 6em;
		margin-bottom: 20px;
	}
</style>
<center>
	<font size="30px" color="#67B869">Success!</font><br/>
	Your account has been created<br/><br/>
	<i class="fas fa-check-circle"></i><br/>
<b>Login Id :</b> {{$loginId}}<br/>
<b>Password :</b> {{$password}}<br/><br/>

We send your <b>login id</b> and <b>password</b> in your phone and email.

<br/><br/>

<button class="btn btn-success" style="width: 90%;border-radius: 50px;font-size: 15px;" onclick="loadLoginArea('login')">Login Your New Account</button>
</center>