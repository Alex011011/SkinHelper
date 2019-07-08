var ctx;
function load() {
    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
    
    var canvas = document.getElementById('imageCanvas');
    ctx = canvas.getContext('2d');
}

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            convertImage();
        }

        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function convertImage() {
    //blank data
    temp = ctx.getImageData(46, 52, 2, 12);

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