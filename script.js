var canvas, ctx;
var canv = document.createElement('canvas');

function load() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    canvas = document.getElementById('imageCanvas');
    ctx = canvas.getContext('2d');
}

function handleImage(e) {
    const files = e.currentTarget.files;
    var x = 0, y = 0;
    canvas.height = 64;
    Object.keys(files).forEach(i => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (event) => {
            // TODO canvas size management and image processing
            var img = new Image()
            img.src = event.target.result;
            img.onload = () => {
                ctx.drawImage(img, 
                    (x == 0 ? x++ : x++ * 64) + 10, 
                    (y == 0 ? 0   : y   * 64) + 10
                );

                if (x % 5 == 0) {
                    x = 0;
                    y++;
                    redraw();
                }
                convertImage(x, y);
            }
        }
        reader.readAsDataURL(file);
    });
}

function convertImage(offsetX, offsetY) {
    //blank data
    var temp = ctx.getImageData(46, 52, 2, 12);
    
    for (i = 0; i < temp.data.length; i++) {
        temp.data[i] = 0;
    }
    //right arm, 1st layer
    ctx.putImageData(ctx.getImageData(37, 48, 11, 16), 36, 48);
    ctx.putImageData(ctx.getImageData(41, 48, 3, 4), 40, 48);
    ctx.putImageData(temp, 46, 52);
    //right arm, 2nd layer
    ctx.putImageData(ctx.getImageData(53, 48, 11, 16), 52, 48);
    ctx.putImageData(ctx.getImageData(57, 48, 3, 4), 56, 48);
    ctx.putImageData(temp, 62, 52);
    //left arm, 1st layer
    ctx.putImageData(ctx.getImageData(48, 16, 9, 16), 47, 16);    
    ctx.putImageData(ctx.getImageData(50, 16, 2, 4), 49, 16);
    ctx.putImageData(ctx.getImageData(52, 20, 4, 12), 51, 20);
    //left arm, 2nd layer
    ctx.putImageData(ctx.getImageData(48, 36, 9, 16), 47, 36);    
    ctx.putImageData(ctx.getImageData(52, 36, 4, 12), 51, 36);
}

function downloadImg() {
    var download = document.getElementById("download");
    var image = document.getElementById("imageCanvas").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
    
    download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}

function redraw() {
    canv.width = canvas.width;
    canv.height = canvas.height;
    canv.getContext('2d').drawImage(canvas, 0, 0);
    canvas.height += 74;
    ctx.drawImage(canv, 0, 0);
}