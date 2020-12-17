$(document).ready(function() {
    var totalPreload = 3;
    var totalPreloadComplete = 0;
    setTimeout(function() {
        preLoad();
    }, 300);

    function preLoad() {
        loadModal();
    }

    function loadModal() {
        setLoadingText("Modal Script")
        $.get("/modal", function(response) {
            $('#modal-area').html(response);
            totalPreloadComplete++;
            loadSidebar();
        });
    }

    function loadSidebar() {
        setLoadingText("Sidebar")
        var data = {
            'preload_sidebar': 1,
            'json': 1
        }
        $.get(url.get(), data).done(function(response) {
            $('#sidebar-area').html(response);
            totalPreloadComplete++;
            loadContent();
        }).fail(function(error) {
            checkError(error);
        });
    }

    function loadContent() {
        setLoadingText("Content");
        var data = {
            'load_content': 1,
            'json': 1
        }
        $.get(url.get(), data).done(function(response) {
            $('#body').html(response);
            totalPreloadComplete++;
            setLoadingText("Success");
        }).fail(function(error) {
            checkError(error);
        });
    }

    function checkError(responseError) {
        alert("Error Found\n------\n" + responseError.responseJSON.message);
        window.location.href = responseError.responseJSON.debugUrl;
    }

    function showBody() {
        //console.log(totalPreloadComplete);
        if (totalPreload == totalPreloadComplete) {
            $('#pre-loader').html("");
            $('#body-area').show();
            clearInterval(loadBody);
        }
    }

    function setLoadingText(txt) {
        txt = Math.ceil((100 * totalPreloadComplete) / totalPreload);
        $("#loadingTxt").html("Loading " + txt + "%");
    }

    function addScript() {
        setLoadingText("Script");
        var scriptElement = document.createElement("script");
        scriptElement.src = "";
        $(document.head).append(scriptElement);
    }
    var loadBody = setInterval(function() {
        showBody();
    }, 1000);
});