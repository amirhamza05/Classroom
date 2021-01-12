//single page load
$(document).ready(function() {
    $('body').on('click', 'a', function(e) {
        var title = $(this).attr("title");
        if (title == "logout") return;
        e.preventDefault();
        url.load($(this).attr("href"));
        setActiveSidebarClass();
    });
    $(window).on('popstate', function(event) {
        setActiveSidebarClass();
        $("#topLoader").show();
        url.load();
    });

    function setActiveSidebarClass() {
        var sidebarList = ["dashboard", "courses", "routine", "profile", ];
        jQuery.grep(sidebarList, function(option, i) {
            if (url.get().indexOf(option) >= 0) {
                $('.sidebar a li.active').removeClass('active');
                $('#sidebar_' + option).addClass('active');
                return;
            }
        }).length;
    }
});
var app = {
    'name': $('meta[name="app-name"]').attr('content'),
    'token': $('meta[name="csrf-token"]').attr('content'),
    setToken: function(data) {
        data = !data ? {} : data;
        data['_token'] = this.token;
        return data;
    }
};
var url = {
    get: function(noParm) {
        var newUrl = (noParm) ? location.protocol + '//' + location.host + location.pathname : window.location.href;
        return (newUrl.substr(newUrl.length - 1) == "/") ? newUrl.slice(0,-1) : newUrl;
    },
    set: function(data, title, url) {
        if (this.get() != url) history.pushState(data, title, url);
    },
    load: function(url) {
        if (url) this.set('', '', url);
        $("#topLoader").show();
        var data = {
            'load_content': 0,
            'json': 1
        };
        $.get(this.get(), data, function(response) {
            document.title = $(response).filter('title').text();
            $("#topLoader").hide(100);
            $("#body").html(response);
        }).fail(function(error) {
            if (error.status == 500) {
                alert("Error Found\n------\n" + error.responseJSON.message);
                window.location.href = error.responseJSON.debugUrl;
            } else {
                $("#topLoader").hide(100);
                toast.danger(error.responseJSON.message);
                parent.history.back();
            }
        });
    }
};
//
var failError = {
    toast: function(error) {
        toast.danger(error.responseJSON.message);
    }
}
//start button
var btn = {
    off: function(btnId, txt) {
        txt = !txt ? "" : txt;
        $("#" + btnId).attr("disabled", true);
        $("#" + btnId).html("<i class='fa fa-refresh fa-spin fa-1x fa-fw'></i> " + txt);
    },
    on: function(btnId, txt) {
        $("#" + btnId).attr("disabled", false);
        if (txt) $("#" + btnId).html(txt);
    }
};
// Start Modal Script
var modal = {
    lg: {
        open: function(msg) {
            modalOpen("lg", msg)
        },
        close: function() {
            modalClose("lg")
        },
        body: "modal_lg_body",
        setBody: function(txt) {
            $("#" + this.body).html(txt)
        }
    },
    md: {
        open: function(msg) {
            modalOpen("md", msg)
        },
        close: function() {
            modalClose("md")
        },
        body: "modal_md_body",
        setBody: function(txt) {
            $("#" + this.body).html(txt)
        }
    },
    sm: {
        open: function(msg) {
            modalOpen("sm", msg)
        },
        close: function() {
            modalClose("sm")
        },
        body: "modal_sm_body",
        setBody: function(txt) {
            $("#" + this.body).html(txt)
        }
    }
};

function modalOpen(type, header) {
    $("#modal_" + type).modal("show");
    $("#modal_" + type + "_header").html(header);
}

function modalClose(type) {
    $("#modal_" + type).modal("hide");
}
//end modal
// start toast script
var toast = {
    success: function(msg) {
        makeToast("success", msg)
    },
    danger: function(msg) {
        makeToast("danger", msg)
    },
    info: function(msg) {
        makeToast("info", msg)
    },
    warning: function(msg) {
        makeToast("warning", msg)
    }
};

function makeToast(toastType, toastMsg) {
    var toastIconList = {};
    toastIconList['success'] = 'check-circle';
    toastIconList['danger'] = 'times-circle';
    toastIconList['warning'] = 'exclamation-circle';
    toastIconList['info'] = 'info-circle';
    var toastIcon = toastIconList[toastType];
    var dom = '<div class="top-alert"><div class="alert alert-' + toastType + '-alt alert-dismissable fade in " role="alert"><i class="fas fa-' + toastIcon + ' toast-icon"></i>' + toastMsg + '<button type="button" class="toast-close" data-dismiss="alert" aria-label="Close">×</button></div></div>';
    var jdom = $(dom);
    jdom.hide();
    $("body").append(jdom);
    jdom.fadeIn();
    setTimeout(function() {
        jdom.fadeOut(function() {
            jdom.remove();
        });
    }, 2000);
}
// end toast script