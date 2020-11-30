
function btnOff(btnId, txt) {
    txt = !txt ? "" : txt;
    $("#" + btnId).attr("disabled", true);
    $("#" + btnId).html("<i class='fa fa-refresh fa-spin fa-1x fa-fw'></i> " + txt);
}

function btnOn(btnId, txt) {
    txt = !txt ? "" : txt;
    $("#" + btnId).removeAttr("disabled");
    if (txt != "") $("#" + btnId).html(txt);
}



function loader(divName){
    $("#"+divName).html('<div style="text-align: center;"><img style="top: 30%;height: 100px; width: 100px;" src="https://retchhh.files.wordpress.com/2015/03/loading4.gif"></div>');
}


function loadLoginArea(action) {
    var data = {
        'page': action,
        '_token': _token
    };
    $.get("/" + action, {}, function(response) {
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
        if (response.error == 0) location.reload();
        else {
            $("#loginResponse").html(response.errorMsg);
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
    btnOff("registrationBtn", "Processing...");
    $.post("/registration", data, function(response) {
        console.log(response);
        if (response.error != 1) {
            $("#loginArea").html(response);
        } else {
            $("#errorArea").show();
            $("#errorArea").html("");
            $.each(response.errorMsg, function(index, msg) {
                $("#errorArea").append("" + msg + "<br/>");
            });
        }
        btnOn("registrationBtn", "Register New Account");
    });
}
