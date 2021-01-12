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
	<div class="name">{{$courseData->name}}</div>
</div>
@for($i=1; $i<=4; $i++)
<img id="scream" width="100%"  src="{{$scheduleData->getBoard()}}" alt="The Scream">
@endfor
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

