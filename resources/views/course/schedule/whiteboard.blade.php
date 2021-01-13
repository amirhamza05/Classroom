



<?php 
	$whiteboards = $scheduleData->whiteboards()->get();
?>



<style type="text/css">
	.whitebordImg{
		width: 100%;
		height: 150px;
		margin-bottom: 10px;
		border: 2px solid #CCCCCC;
		border-radius: 10px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
	}
</style>

<script type="text/javascript">
	function downloadBoard(){
		window.open(url.get(1)+"/whiteboard/download", '_blank'); 
	}
	function enterBoard(){
		window.open(url.get(1)+"/whiteboard/", '_blank'); 
	}
</script>

<div class="row">
<div class="col-md-12" style="margin-top: 15px;margin-bottom: 15px;">
	<div class="pull-right">
		<button onclick="downloadBoard()" class="btn-primary"><i class="fa fa-download"></i> Download Board (PDF)</button>
		<button onclick="enterBoard()" class="btn-success">Enter Bord</button>
	</div>
</div>
@foreach($whiteboards as $whiteboard)
	<div class="col-md-4">
		<img id="scream" width="100%" class="whitebordImg" style="" height="100px" src="{{$whiteboard->getBoard()}}" alt="The Scream">
	</div>
@endforeach

</div>