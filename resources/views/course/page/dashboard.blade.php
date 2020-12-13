<style type="text/css">
	.course .cover{
	}
	.course .cover img{
		border-radius: 10px;
		width: 100%;
		height: 250px;
	}
	.course .cover .body{
		margin-top: -215px;
		color: #000000;
		margin-left: 15px;
		position:relative;
		border-radius: 5px;
		padding-top: 0px;
		color: #ffffff;
		width: 100%;
		overflow: hidden;
	}
	.course .cover .body .td1{
		font-size: 13px;
		font-weight: bold;
		border: 1px solid rgba(1,1,1,0.1);
		background-color: rgba(1,1,1,0.1);
		padding: 7px;
		width: 110px;
		color: #dcdde1;
		text-align: right;
	}
	.course .cover .body .td2{
		font-size: 13px;
		padding: 7px;
		border: 1px solid rgba(1,1,1,0.1);
		background-color: rgba(1,1,1,0.1);
		color: #f5f6fa;
	}
</style>
<div class="row">
	<div class="col-md-12">
		<div class="cover">
			<img src="{{asset($courseData->cover)}}" style="">
			<div class="body">
				<font style="font-size: 30px;"><b>{{$courseData->name}}</b></font>
				<table style="width: 300px;margin-top: 10px;">
					<tr>
						<td class="td1"><b>Section: </b></td>
						<td class="td2">{{$courseData->section}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Subject: </b></td>
						<td class="td2">{{$courseData->subject}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Room: </b></td>
						<td class="td2">{{$courseData->room}}</td>
					</tr>
					<tr>
						<td class="td1"><b>Course Code: </b></td>
						<td class="td2">{{$courseData->code}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
