<style type="text/css">
	.teacher-add-area{

	}
	.teacher-add-area input{
		width: 93%;
		padding: 5px;
		float: left;
		
	}
	.teacher-add-area .select-list-area{
		border-bottom: 1px solid #eeeeee;
		margin-bottom: 5px;
		padding: 10px;
	}
	.teacher-add-area .select-list-area i{
		padding: 5px;
	}
	.teacher-add-area .select-list-area span{
		font-size: 13px;
	}
	.teacher-add-area .select-search-area{
		padding: 10px;
	}
	.teacher-add-area .select-search-result{
		padding: 5px;
		height: 300px;
		overflow-y: scroll;
	}
	.teacher-add-area .select-search-result-li{
		border: 1px solid #eeeeee;
		padding: 5px;
		border-radius: 15px;
		margin-bottom: 2px;
	}
	.teacher-add-area .select-search-result-li img{
		height: 40px;
		width: 40px;
		border-radius: 100%;
		float: left;
		margin-right: 10px;
		margin-left: 5px;
		margin-top: 0px;
		
	}
	.teacher-add-area .select-search-result-li:hover{
		cursor: pointer;
		background-color: #f1f1f1;
		border-radius: 15px;
	}
	.cart-span{
		margin-right: 5px;
		display: inline-block;
		margin-bottom: 5px;
	}

</style>

<div class="box teacher-add-area" style="padding: 0px;">
	<div class="select-list-area" id="select-list-area">
	</div>
	<div class="select-search-area">
		<input type="text" name="" class="form-control" onkeyup="getTeacherList()" id="searchTeacher" autocomplete="off"><img id="select-search-area-loader" style="margin: 5px 0px 0px 5px;display: none;" height="20px" width="20px" src="{{asset('img/site/loading.gif')}}">
	</div>
	<div class="select-search-result" style="width: 100%" id="responseSearch">
	</div>
</div>
<div class="row">
	<div class="pull-left">
		<select>
			<option>Admin</option>
			<option>Moderator</option>
		</select> 
	</div>
	<div class="pull-right">
		<button>Add Teacher</button>
	</div>
</div>
