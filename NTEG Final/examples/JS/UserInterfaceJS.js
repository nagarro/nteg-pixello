var videoCamera = new tracking.VideoCamera().hide().render().renderVideoCanvas();
var img = document.createElement('image');
var cursorLocation;
img.src = 'img/cursor.png';
var t1 = videoCamera.track(
        {
            type: 'color',
            color: 'magenta',
            onFound: function (track) {
                cursorLocation = track;
                var pixels = track.pixels;

                //                for (var i = 0, len = pixels.length; i < len; i += 2) {
                //                    videoCamera.canvas.context.fillStyle = "rgb(255,0,255)";
                //                    videoCamera.canvas.context.fillRect(pixels[i], pixels[i + 1], 2, 2);
                //                }
                RenderUI(track);
                //videoCamera.canvas.context.drawImage(img, track.x, track.y);
                //                videoCamera.canvas.context.fillStyle = "rgb(0,0,0)";
                //                videoCamera.canvas.context.fillRect(track.x, track.y, 5, 5);
            },
            onNotFound: function () {
            }
        }

    );
window.onload = function () { alertSize(); };
function alertSize() {
    myWidth = 0; myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    widthRatio = (myWidth / 320) + 1.5;
    heightRation = (myHeight / 240) + 1.5;
}
function RenderUI(track) {
    cursor.style.top = (track.y * heightRation) + "px";
    cursor.style.right = (track.x * widthRatio) + "px";

    //            var context = UsreInterfaceCanvas.getContext("2d");
    //            console.log("X:" + track.x);
    //            console.log(track.y);
    //            UsreInterfaceCanvas.width = UsreInterfaceCanvas.width;
    //            context.drawImage(img, track.x, track.y);
    //                            context.fillStyle = "rgb(0,0,0)";
    //                            context.fillRect(track.x, track.y, 5, 5);
}

function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}


window.setInterval(function () {
    if (collision($('#cursor'), $('#testDiv'))) {
        $('#Msg').text('true');
        $('#testDiv').css("background-color", "red");
        $('#testDiv').css("position", "absolute");

        $('#testDiv').css({ right: cursor.style.right, top: cursor.style.top });

    }
    else {
        $('#Msg').text('false');
        $('#testDiv').css("background-color", "blue");
        //$('#testDiv').css("position", "relative");
    }

}, 200);


