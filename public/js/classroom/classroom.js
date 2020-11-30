
function loadCreateCourse(){
	modal.md.open("Create Course");
	loader(modal.md.body);
	$.get('/teacher/create_course', function(response) {
    	modal.md.setBody(response);
    });
}
function loadCourseList(){
	$.get('/teacher/course',{'noLayout':1}, function(response) {
    	$("#body").html(response);
    });
}
