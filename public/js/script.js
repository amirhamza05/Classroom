//single page load
$(document).ready(function() {
    
    $('body').on('click', 'a', function(e) {
        var title = $(this).attr("title");
        if (title == "logout") return;
        e.preventDefault();

        //change url
        var url = $(this).attr("href");
        history.pushState('data', '', url);
        setActiveSidebarClass();
        
        $("#topLoader").show();

        var data = {
            'noLayout': 1
        };
        $.get(url, data, function(response) {
            $("#body").html(response);
            $("#topLoader").hide(100);
        });
    });
    $(window).on('popstate', function(event) {
        setActiveSidebarClass();
        $("#topLoader").show();
        $.get(url, {
            'noLayout': 1
        }, function(response) {
            $("#body").html(response);
            $("#topLoader").hide(100);
        });
    });

    function setActiveSidebarClass() {
        url = window.location.href;
        var sidebarList = ["dashboard", "course", "routine", "profile", ];
        jQuery.grep(sidebarList, function(option, i) {
            if (url.indexOf(option) >= 0) {
                $('.sidebar a li.active').removeClass('active');
                $('#sidebar_' + option).addClass('active');
                return;
            }
        }).length;
    }
});
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