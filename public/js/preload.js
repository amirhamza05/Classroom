$(document).ready(function() {
    var totalPreload = 3;
    var totalPreloadComplete = 0;
    
    setTimeout(function(){ preLoad(); }, 300);

    function preLoad() {
        addScript();
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
            'preload_sidebar': 1
        }
        $.get(url.get(), data, function(response) {
            $('#sidebar-area').html(response);
            totalPreloadComplete++;
            loadContent();
        });
    }

    function loadContent() {
        setLoadingText("Content");
        var data = {
            'load_content': 1
        }
        $.get(url.get(), data, function(response) {
            
            if(response.error){
               console.log(response.debug);
               window.location.href = response.debug;
            }
            else{
                $('#body').html(response);
                totalPreloadComplete++;
                setLoadingText("Success");
            }
            console.log('load content');
        });
    }

    function showBody() {
        console.log(totalPreloadComplete);
        if (totalPreload == totalPreloadComplete) {
            $('#pre-loader').html("");
            $('#body-area').show();
            clearInterval(loadBody);
        }
    }

    function setLoadingText(txt){
        console.log(txt);
        txt = Math.ceil((100*totalPreloadComplete)/totalPreload);
        $("#loadingTxt").html("Loading "+txt+"%");
    }

    function addScript(){
        setLoadingText("Script");
        var scriptElement = document.createElement( "script" );
            scriptElement.src = "http://127.0.0.1:8000/js/course/course.js";
 
            $( document.head ).append( scriptElement );
    }

    var loadBody = setInterval(function() {
        showBody();
    }, 1000);
});