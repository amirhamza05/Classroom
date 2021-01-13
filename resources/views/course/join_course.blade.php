<div id="errorArea" class='errorArea' style="display:none;"></div>
<form action="{{url($userType.'/courses/join')}}" id="join_course" method="post">
	@csrf
<div class="course-list">
<div class="row">
	<div class="col-md-3 inputLabel">Course Code<font color="red">*</font>:</div>
	<div class="col-md-8"><input type="text" class="input" name="code" placeholder="Course Code" autocomplete="off"></div>

	<div class="col-md-8"></div>
	<div class="col-md-8">
		<div class="pull-left">
			<button type="submit" id="createBtn" style="margin-top: 20px;">Join Course</button>
		</div>
	</div>
</div>
</div>
</form>
<script type="text/javascript">
	$(document).ready(function(){
  		$("#join_course").submit(function(event){
    		event.preventDefault(); //prevent default action
    		var formData = $(this).serializeArray();
    		$.post(url.get(1)+"/join", formData, function(response) {
        		if (response.error == 0) {
        			modal.md.close();
        			toast.success(response.msg);
        			 url.load();
        		}
        		else {
					// $("#loginResponse").html(response.errorMsg);
					console.log(response.msg);
					$("#errorArea").show();
            		$("#errorArea").html(response.msg);
           			
        		}
    		});
		  });
		  
	});
</script>
