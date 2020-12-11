function deleteCourse(){
	var ok = confirm("Are you want to delete this course");
	if(!ok)return;
	$.post(url.get()+"/delete", app.setToken(), function(response) {
        if(response.error == 0){
        	toast.success(response.msg);
        	loadCourseList();
        }
        else{
        	toast.danger(response.errorMsg);
        }
    });
}

function loadCreateCourse(){
	modal.md.open("Create Course");
	loader(modal.md.body);
	$.get(url.get(1)+"/create", function(response) {
    	modal.md.setBody(response);
    });
}
function loadCourseList(){
	url.load('/teacher/courses');
}
function loadTeacherList(){
    url.load(url.get());
}
function addTeacher(){
	var userId = prompt("prompt", "User Id");
	if(!userId)return;
    var data = {
		'user_id': userId,
	};
	$.post(url.get(1)+"/create", app.setToken(data), function(response) {
        if(response.error == 1){
        	 toast.danger(response.errorMsg);
        }
        else{
            toast.success(response.msg);
            loadTeacherList();
        }
    });
}
