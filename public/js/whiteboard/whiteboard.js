var board = {
    color: $(".selected").css("background-color"),
    canvasF: $("canvas"),
    canvas: $("canvas")[0],
    context: $("canvas")[0].getContext("2d"),
    totalSave: 0,
    totalLineDown: 0,
    lastEvent: null,
    mousedown: false,
    editMode: true,
    editing: false,
    lastEdit: null,
    lastUpdate: null,
    pencilLength: 2,
    lastUpdateTime: 0,
    realTimeHash: null,
    tool: 'pencil',
    setBoard: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage($("#scream")[0], 0, 0, this.canvas.width, this.canvas.height);
    },
    loadFile: function(e) {
        this.editing = true;
        var image = new Image();
        image.src = URL.createObjectURL(e.target.files[0]);
        image.onload = function() {
            board.context.clearRect(0, 0, board.canvas.width, board.canvas.height);
            board.context.drawImage(image, 0, 0, Math.min(this.width, board.canvas.width), Math.min(this.height, board.canvas.height));
            board.save();
        };
    },
    updateCanvas: function() {
        if (this.editing) return;
        var data = {
            'image': true,
            'board_hash': boardHash,
        };
        $.get(url.get(1) + "/get", data, function(response) {
            //if same then no update canvas
            
            if (parseInt(response.last_update) <= board.lastUpdateTime) return;
            //if (response.last_update_hash == board.realTimeHash) return;
            board.lastUpdateTime = parseInt(response.last_update);
            //board.realTimeHash = response.last_update_hash;
            var image = new Image();
            image.src = response.image;
            image.onload = function() {
                if (this.editing) return;
                board.context.clearRect(0, 0, board.canvas.width, board.canvas.height);
                board.context.drawImage(image, 0, 0);
            };
        });
    },
    update: function() {
       // return;
        if (this.editing) return;
        var data = {
            'board_hash': boardHash,
        }
        $.get(url.get(1) + "/get", data, function(response) {
           if (parseInt(response.last_update) <= board.lastUpdateTime) return;
            board.updateCanvas();
        });
    },
    save: function() {
        var data = {
            'board': this.canvas.toDataURL("image/png"),
            'board_hash': boardHash
        };

        $.post(url.get(1) + "/save", app.setToken(data), function(response) {
            //console.log("saved");
            board.editing = false;
            board.lastUpdateTime = parseInt(response.last_update);
            board.realTimeHash = response.realTimeHash;
            //console.log(board.lastUpdate);
        });
    },
    reset: function() {
        this.editing = true;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.save();
    },
    drawPencil: function(e) {
        this.context.beginPath();
        this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
        this.context.lineTo(e.offsetX, e.offsetY);
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.pencilLength;
        this.context.lineCap = 'round';
        this.context.lineJoin = "round";
        this.context.stroke();
        this.lastEvent = e;
    },
    eraser: function(e) {
        this.context.beginPath();
        this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
        this.context.lineTo(e.offsetX, e.offsetY);
        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.pencilLength;
        this.context.lineCap = 'round';
        this.context.lineJoin = "round";
        this.context.stroke();
        this.lastEvent = e;
    }
};
var $canvas = board.canvasF;
$("#pencilLength").on("change", function() {
    $("#pencilLenVal").html(this.value);
    board.pencilLength = parseInt(this.value);
});
var socketBoard = setInterval(function() {
    board.update();
}, 1000);
setTimeout(function() {
    board.setBoard();
}, 500);
var loadFile = function(e) {
    board.loadFile(e);
};

function goCanvasPage(hashId){
    window.location.href = url.get(1)+"?board="+hashId;
}

function addNewPage() {
    $.get(url.get(1) + "/add_page", function(response) {
        window.location.href = url.get(1)+"?board="+response.board_hash;
    });
}
$("#controls").on("click", "li", function() {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    board.color = $(this).css("background-color");
});
$("#toolbar").on("click", "li", function() {
    var tool = $(this).attr("tool");
    if (tool == "image") $('#addImage').trigger('click');
    else if (tool == "reset") {
        var ok = confirm("Are you want to reset this board");
        if (!ok) return;
        board.reset();
    } else {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        board.tool = tool;
    }
});

function makeCursor() {
    var cursor = document.createElement('canvas'),
        ctx = cursor.getContext('2d');
    cursor.width = 20;
    cursor.height = 20;
    ctx.strokeStyle = board.color;
    ctx.lineWidth = board.width;
    width = 14 + board.pencilLength;
    //ctx.moveTo(150, 150);
    // ctx.arc(15, 15, 15, 0, 2 * Math.PI);
    //var img = document.getElementById("pencil");
    //ctx.font=17 + 'px FontAwesome';
    //ctx.rotate(30);
    ctx.font = '15px Arial';
    //ctx.translate(150,150);
    ctx.rotate(Math.PI / 4);
    ctx.textAlign = 'right';
    ctx.fillText('Hello World', 30, 20);
    //ctx.textAlign = 'right';
    // ctx.fillText('Hamza',30 ,30);
    //\uf1fc
    ctx.stroke();
    // set image as cursor (modern browsers can take PNGs as cursor).
    return 'url(' + cursor.toDataURL() + '), auto';
}


// painting with mouse events
$canvas.mousedown(function(e) {
    if(isTeacher){
        board.lastEvent = e;
        board.mouseDown = true;
        board.editing = true;
        board.totalLineDown++;
    }
}).mousemove(function(e) {
    if(isTeacher){
        $canvas.css('cursor', "url(/img/icon/pencil.png),auto");
    }
    if (board.mouseDown) {
        if (board.tool == "eraser") board.eraser(e);
        else if (board.tool == "pencil") board.drawPencil(e);
    }
}).mouseup(function() {
   if(isTeacher){
        board.mouseDown = false;
        board.save();
    }
}).mouseleave(function() {
    if(isTeacher){
        board.mouseDown = false;
    }
});
//temp start