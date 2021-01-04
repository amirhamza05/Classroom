
@extends($layout)
@section('title', 'Profile')

<style>
.container{
	background:white;
	width: 100%;
}
.container  .profile{
	margin-left:420px;
	margin-bottom:-40px;
	margin-top:55px;
}
.container .profileUpdate{
	background: pink;
	margin-top:55px;
	border-style: solid;
    border-color: #FF83A8;
	margin-left: 230px;
	/* padding: -5px 10px; */
	width: 50%;
}
.container .profileUpdate .errorshow{
	
	 margin-top:10px;
     margin-left: 80px;
	 background:#D96F8F;
	 border-width: 1px;
     border-color: #FF83A8;
	 width:70%;

} 
.container .profileUpdate .errorshow .area{
	text-align: center;
	margin-bottom:5px;
   
	 color: white;

} 
.container .updatePass .errorPass{
	
	margin-top:10px;
	margin-left: 80px;
	background:#D96F8F;
	border-width: 1px;
	border-color: #FF83A8;
	width:70%;

} 
.container .updatePass .errorPass .areaPass{
   text-align: center;
   margin-bottom:5px;

	color: white;

} 

.container .required{
	margin-left: 120px;
	color: #8C1E3F;
}
.container .Pass{
	margin-left:420px;
	margin-bottom:-40px;
	margin-top:55px;
}
.container .updatePass{
	background: pink;
	margin-top:45px;
	border-style: solid;
    border-color: #FF83A8;
	margin-left: 230px;
	/* padding: -5px 10px; */
	width: 50%;
	margin-bottom:100px;
}

.container .form-group .pass{
    color: #595f5a;
	margin-left: 120px;
    margin-top:15px;
	margin-bottom:5px;
}
.container .updatePass .update{
	margin-left: 420px;
	margin-bottom:10px;
	/* border-style: solid;
    border-color: #6d746e; */
	background: #a6aba7;
	color: #363a37;
}
.container .form-group .title{
    color: #595f5a;
	margin-left: 120px;
    margin-top:15px;
	margin-bottom:5px;
}

.container .form-group .form-control{
	/* padding: 5px 30px; */
    margin-left: 120px;
	margin-bottom: 3px; 
	border-style: solid;
    border-color: #FF83A8;
	width: 50%;
	/* display: inline-block;  */
	resize: none;
	overflow: hidden; 
}
.container .profileUpdate .submit{
	margin-left: 420px;
	margin-bottom:10px;
	/* border-style: solid;
    border-color: #6d746e; */
	background: #a6aba7;
	color: #363a37;
}

</style>

<div class="row">
<div class="col-md-12">
<div class=container>

	<h4 class='profile'>MY PROFILE </h4>
    <div class="profileUpdate">
	<div class='errorshow' >
	 <div class="area" >
	<div id="errorArea"></div>
    </div></div>
    <!-- {{ Auth::user()->id}} -->
   <form id="update_detail" method = "post" action = "{{url($userType.'/profile/'.Auth::user()->id)}} ">
  {{ csrf_field() }}
    <div class="form-group">
      <label class="title" for="full_name">Full Name</label>
	  <textarea name="full_name" rows="1" class="text-area-messge form-control"
       placeholder="" aria-required="true" aria-invalid="false">{{Auth::user()->full_name}}</textarea >
	  <!-- <input type="text" class="form-control" id="full_name" placeholder="{{Auth::user()->full_name}}" name="full_name"> -->
	  <div class="form-group">
	<label class="title" for="nick_name">Nick Name</label>
	  <textarea name="nick_name" rows="1" class="text-area-messge form-control"
       placeholder="" aria-required="true" aria-invalid="false">{{Auth::user()->nick_name}}</textarea >
	  <!-- <input type="text" class="form-control" id="full_name" placeholder="{{Auth::user()->full_name}}" name="full_name"> -->
      </div>
	  <div class="form-group">
	<label  class="title" for="email">Email</label>
	  <textarea name="email" rows="1" class="text-area-messge form-control"
       placeholder="" aria-required="true" aria-invalid="false">{{Auth::user()->email}}</textarea >
	  <!-- <input type="text" class="form-control" id="full_name" placeholder="{{Auth::user()->full_name}}" name="full_name"> -->
	  </div>
    </div>
	  <div class="form-group">
	<label   class="title" for="phone">Phone Number</label>
	  <textarea name="phone" rows="1" class="text-area-messge form-control"
       placeholder="" aria-required="true" aria-invalid="false">{{Auth::user()->phone}}</textarea >
	  <!-- <input type="text" class="form-control" id="full_name" placeholder="{{Auth::user()->full_name}}" name="full_name"> -->
	
    <button class='submit' type="submit" class="btn btn-default">Save</button>
	
  </form>
  </div>
  <script type="text/javascript">
	$(document).ready(function(){
  		$("#update_detail").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post("{{url($userType.'/profile/'.Auth::user()->id)}}" , formData, function(response) {
				if (response.error == 0) {
        			modal.md.close();
        			toast.success(response.msg);
        			url.load(url.get());
        		}
        		else {
            		$("#errorArea").show();
            		$("#errorArea").html("");
           			$.each(response.errorMsg, function(index, msg) {
                		$("#errorArea").append("" + msg + "<br/>");
            		});
        		}
			
    		}).fail(function(error) {
        		failError.toast(error.msg);
    		});
  		});
	});
	</script>
	</div>

<h4 class='Pass'>PASSWORD </h4>
<div class='updatePass'>
<div class='errorPass' >
	 <div class="areaPass" >
	<div id="errorAreas"></div>
    </div></div>
 <form id='UpdatePass' method="post" action="{{url($userType.'/profile/'.Auth::user()->id.'/password')}}" >
	{{ csrf_field() }}

<div class="form-group"> 
<label class="pass" for="Current pwd">Current Password</label>
<input type="password" class="form-control" id="old_password" placeholder="Enter password" name="old_password">
</div>

<div class="form-group"> 
<label class="pass" for="New pwd">New Password</label>
<input type="password" class="form-control" id="new_password" placeholder="Enter password" name="new_password">
<h6 class="required">*Required at least 6 characters, 1 lowercase,</h6><h6 class="required"> 1 uppercase and 1 number </h6>
</div>

<button class="update" type="submit">Save</button>

</form>
</div>
<script type="text/javascript">
	$(document).ready(function(){
  		$("#UpdatePass").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post("{{url($userType.'/profile/'.Auth::user()->id.'/password')}}" , formData, function(response) {
        		// toast.success(response.msg);
				// url.load();
				if (response.error == 0) {
        			modal.md.close();
        			toast.success(response.msg);
        			url.load(url.get());
        		}
        		else {
            		$("#errorAreas").show();
            		$("#errorAreas").html("");
           			$.each(response.errorMsg, function(index, msg) {
                		$("#errorAreas").append("" + msg + "<br/>");
            		});
        		}

    		}).fail(function(error) {
        		failError.toast(error.msg);
    		});
  		});
	});
	</script>



</div>