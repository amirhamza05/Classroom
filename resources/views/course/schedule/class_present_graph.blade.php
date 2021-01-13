<button onclick="loadPresent()">Load Present</button>


<div style="height: auto">

	<div id="chartContainer" style=""></div>

</div>
<br/>
S amir
@for($i=1; $i<100; $i++)
sadf
ssdaf
sdaf
@endfor
<script type="text/javascript">
	function loadPresent(){
    	$.get("http://127.0.0.1:8000/teacher/courses/97/schedule/9/present_graph", function(response) {
       		modal.lg.setBody(response);
    	});
	}
</script>
