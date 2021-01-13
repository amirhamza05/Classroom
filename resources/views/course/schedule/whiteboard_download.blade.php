<style type="text/css">
	body{
		background-color: #ffffff;
	}
	.front-page{
		text-align: center;
		margin-top: 100px;
	}
	.front-page .name{
		font-size: 25px;
		font-weight: bold;
	}
</style>
<div id="footer">
  <div class="page-number"></div>
</div>
<div class="front-page">
	<font size="40px">Class Lecture Board</font>
	<div class="name">{{$courseData->name}}</div>
	<b>Class Title:</b> {{$scheduleData->name}}<br/>
	<b>Class Start:</b> {{$scheduleData->start_time}}<br/>
	<b>Class End:</b> {{$scheduleData->end_time}}<br/>
</div>
	<?php 
		$whiteboards = $scheduleData->whiteboards()->get();
	?>
		@foreach($whiteboards as $key => $whiteboard)
		<img id="scream" width="100%"  src="{{$whiteboard->getBoard()}}" alt="The Scream">
		@endforeach
<style>
	@page { margin: 5px; }
#header,
#footer {
  position: fixed;
  left: 0;
	right: 0;
	color: #aaaaaa;
}

#footer {
  bottom: 0;
  text-align: right;
  font-weight: bold;
  margin-top: -25px;
  font-size: 14px;
  padding: 5px;
}
.page-number:before {
  content: counter(page);
}
</style>

