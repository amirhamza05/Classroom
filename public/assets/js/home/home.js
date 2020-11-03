function loadLoginArea(action) {
    var data = {
        'page': action,
        '_token': _token
    };
    $.post("/home", data, function(response) {
        $("#loginArea").html(response).fadeIn('slow');
    });
}

function login() {
    var data = {
        'login_id': $("#login_id").val(),
        'password': $("#password").val(),
        '_token': _token
    };
    $.post("/login", data, function(response) {
        if(response.error == 0) location.reload();
        else{
            $("#loginResponse").html(response.error);
            console.log(response);
        }
    });
}

function registration() {
    var data = {
        'full_name': $("#full_name").val(),
        'nick_name': $("#nick_name").val(),
        'user_type': $("#user_type").val(),
        'email': $("#email").val(),
        'phone': $("#phone").val(),
        '_token': _token
    };
    $("#errorArea").hide();
    $.post("/registration", data, function(response) {
        console.log(response);
        if(response.error != 1) {
            $("#loginArea").html(response);
        }
        else{
             $("#errorArea").show();
             $("#errorArea").html("");
             $.each(response.errorMsg, function(index,msg){
                 $("#errorArea").append(""+msg+"<br/>");
             });
        }
    });
}