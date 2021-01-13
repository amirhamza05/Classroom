var teacherAddCartList;
var teacherData = [];
var commentEditor = [];

function getCourseId() {
    return $('meta[name="course-id"]').attr('content');
}

function deleteCourse() {
    var ok = confirm("Are you want to delete this course");
    if (!ok) return;
    $.get(url.get() + "/delete", function(response) {
        toast.success(response.msg);
        loadCourseList();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function leaveCourse() {
    var ok = confirm("Are you want to leave this course");
    if (!ok) return;
    $.get(url.get() + "/leave", function(response) {
        toast.success(response.msg);
        loadCourseList();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function loadCreateCourse() {
    modal.md.open("Create Course");
    loader(modal.md.body);
    $.get(url.get(1) + "/create", function(response) {
        modal.md.setBody(response);
    });
}

function loadJoinCourse() {
    modal.md.open("Join Course");
    loader(modal.md.body);
    $.get(url.get(1) + "/join", function(response) {
        modal.md.setBody(response);
    });
}

function loadCourseList() {
    url.load('/teacher/courses');
}

function loadTeacherList() {
    url.load(url.get());
}

function loadComment() {
    url.load(url.get());
}

function loadReply() {
    url.load(url.get());
}

function loadStudentList() {
    url.load(url.get());
}

function viewAddTeacher() {
    teacherAddCartList = [];
    modal.md.open("Add Teacher");
    loader(modal.md.body);
    $.get(url.get(1) + "/create", function(response) {
        modal.md.setBody(response);
    });
}

function addTeacher() {
    var userId = prompt("prompt", "User Id");
    if (!userId) return;
    var data = {
        'user_id': userId,
    };
    $.post(url.get(1) + "/create", app.setToken(data), function(response) {
        console.log(response);
        if (response.error == 1) {
            toast.danger(response.errorMsg);
        } else {
            toast.success(response.msg);
            loadTeacherList();
        }
    });
}

function addStudent() {
    var userId = prompt("prompt", "User Id");
    if (!userId) return;
    var data = {
        'user_id': userId,
    };
    $.get(url.get(1) + "/create", app.setToken(data), function(response) {
        console.log(response);
        if (response.error == 1) {
            toast.danger(response.errorMsg);
        } else {
            toast.success(response.msg);
            loadStudentList();
        }
    });
}

function acceptRequest() {
    var ok = confirm("Are you want to join this course");
    if (!ok) return;
    courseId = getCourseId();
    var data = {
        'course_id': courseId
    };
    $.post("/teacher/courses/" + courseId + "/confirm", app.setToken(data), function(response) {
        toast.success("Successfully Confirm Request");
        url.load();
    });
}

function deleteRequest() {
    var ok = confirm("Are you want to cancel this request");
    if (!ok) return;
    courseId = getCourseId();
    var data = {
        'course_id': courseId
    };
    $.get("/teacher/courses/" + courseId + "/setting/leave", function(response) {
        toast.success(response.msg);
        loadCourseList();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function deleteTeacher(userId) {
    var ok = confirm("Are you want to delete this teacher");
    if (!ok) return;
    var data = {
        'user_id': userId
    };
    $.get(url.get(1) + "/delete", app.setToken(data), function(response) {
        console.log(response);
        if (response.error == 1) {
            toast.danger(response.errorMsg);
        } else {
            toast.success(response.msg);
            loadTeacherList();
        }
    });
}
//comment area
function postDiscussion() {
    var comment = postEditor.getData();
    if (comment == "") {
        alert("Discussion Can Not Be Empty");
        return;
    }
    var data = {
        'comment': comment
    };
    $.post(url.get() + "/comment", app.setToken(data), function(response) {
        toast.success(response.msg);
        url.load();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function loadUpdateComment(commentId) {
    modal.lg.open("Update Discussion");
    loader(modal.lg.body);
    $.get(url.get(1) + "/comment/" + commentId + "/update", function(response) {
        modal.lg.setBody(response);
    });
}

function updateComment(commentId) {
    var data = {
        'comment': commentEditor[commentId].getData()
    };
    $.post(url.get() + "/comment/" + commentId + "/update", app.setToken(data), function(response) {
        toast.success(response.msg);
        url.load();
        modal.lg.close();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function deleteComment(commentId) {
    var ok = confirm("Are you want to delete this Comment");
    if (!ok) return;
    $.get(url.get(1) + "/comment/" + commentId + "/delete", function(response) {
        console.log(response);
        if (response.error == 1) {
            toast.danger(response.errorMsg);
        } else {
            toast.success(response.msg);
            loadComment();
        }
    });
}

function deleteCommentReply(replyId) {
    var ok = confirm("Are you want to delete this Reply");
    if (!ok) return;
    $.get(url.get(1) + "/comment_reply/" + replyId + "/delete", function(response) {
        console.log(response);
        if (response.error == 1) {
            toast.danger(response.errorMsg);
        } else {
            toast.success(response.msg);
            loadReply();
        }
    });
}

function loadUpdateCommentReply(replyId) {
    modal.md.open("Update Reply");
    loader(modal.md.body);
    $.get(url.get(1) + "/comment-reply/" + replyId + "/update", function(response) {
        modal.md.setBody(response);
    });
}

function updateCommentReply(replyId) {
    var data = {
        'comment_reply': $("#comment_reply_"+replyId).val()
    };
    $.post(url.get() + "/comment-reply/" + replyId + "/update", app.setToken(data), function(response) {
        toast.success(response.msg);
        url.load();
        modal.md.close();
    }).fail(function(error) {
        failError.toast(error);
    });
}


function addCommentReply(commentId) {
    commentReply = $("#comment_reply_" + commentId).val();
    if (commentReply == "") {
        alert("Comment Reply Can Not Be Empty");
        return;
    }
    var data = {
        'comment_reply': commentReply
    };
    console.log(commentId);
    $.post(url.get(1) + "/comment/" + commentId + "/comment-reply", app.setToken(data), function(response) {
        toast.success(response.msg);
        url.load();
    }).fail(function(error) {
        failError.toast(error);
        console.log(error);
    });
}
//delete comment area
function archiveCourseAction(isArchive) {
    msg = isArchive ? "current" : "archive";
    msg = "Are you want to add " + msg + " this course";
    var ok = confirm(msg);
    if (!ok) return;
    var data = {
        'is_archive': isArchive ^ 1
    };
    $.post(url.get() + "/archive", app.setToken(data), function(response) {
        toast.success(response.msg);
        url.load();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function teacherAddCart(id) {
    teacherAddCartList[id] = {
        login_id: teacherData[id].login_id,
        full_name: teacherData[id].full_name
    };
    $("#select-list-area").html("");
    teacherAddCartList.forEach(prepareAddCart);
}

function prepareAddCart(data) {
    var div = "<span class='label label-primary cart-span'>(" + data.login_id + ") " + data.full_name + " <i class='fa fa-times'></i></span>";
    $("#select-list-area").append(div);
}

function getTeacherList() {
    var searchVal = $("#searchTeacher").val();
    if (searchVal == "") {
        $("#responseSearch").html("");
        return;
    }
    var data = {
        'searchVal': searchVal
    }
    $("#select-search-area-loader").show();
    $.get("/teacher/api/teacher_list", app.setToken(data), function(list) {
        $("#responseSearch").html("");
        teacherData = [];
        $.each(list, function(key, teacher) {
            teacherData[teacher.id] = teacher;
            var div = "<div class='select-search-result-li' onclick='teacherAddCart(" + teacher.id + ")'><img src='" + teacher.avatar + "'><b>" + teacher.login_id + "</b><br/>" + teacher.full_name + " (" + teacher.nick_name + ")</div>";
            $("#responseSearch").append(div);
        });
        $("#select-search-area-loader").hide();
    });
}
// schedule area
function loadCreateSchedule() {
    modal.md.open("Create Schedule");
    loader(modal.md.body);
    $.get(url.get(1) + "/create", function(response) {
        modal.md.setBody(response);
    });
}

function loadUpdateSchedule(scheduleId) {
    modal.md.open("Update Schedule");
    loader(modal.md.body);
    var data = {
        'schedule_id': scheduleId
    };
    $.get(url.get(1) + "/" + scheduleId + "/update", data, function(response) {
        modal.md.setBody(response);
    });
}

function deleteSchedule(scheduleId) {
    var ok = confirm("Are you want to delete this schedule class");
    if (!ok) return;
    $.get(url.get(1) + "/" + scheduleId + "/delete", function(response) {
        toast.success(response.msg);
        url.load();
    }).fail(function(error) {
        failError.toast(error);
    });
}

function timeConvert(timeDiffrent) {
    timeDiffrent = timeDiffrent <= 0 ? 0 : timeDiffrent;
    hour = Math.floor(timeDiffrent / 3600);
    timeDiffrent -= hour * 3600;
    minute = Math.floor(timeDiffrent / 60);
    timeDiffrent -= minute * 60;
    second = timeDiffrent;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;
    var data = {
        'hour': hour,
        'minute': minute,
        'second': second
    }
    return data;
}
var loadConversationAreaFlag = 0;

function loadConversationArea() {
    $.get(url.get(1) + "/conversations", function(response) {
        if (response != $("#conversationBody").html() || loadConversationAreaFlag == 0) {
            $("#conversationBody").html(response);
            loadConversationAreaFlag = 1;
        }
        //clearInterval(updateConversationArea);
    }).fail(function(error) {
        clearInterval(updateConversationArea);
    });
}

function sendConversation() {
    var message = $("#message").val();
    if (message == "") {
        alert("Message Can Not Be Empty");
        return;
    }
    var data = {
        'message': message
    };
    $.post(url.get(1) + "/send_conversation", app.setToken(data), function(response) {
        $("#message").val("");
        loadConversationArea();
    }).fail(function(error) {
        failError.toast(error);
    });
}