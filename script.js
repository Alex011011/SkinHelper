// Page setup
var canvas, ctx;
function load() {
    canvas = document.getElementById('imageCanvas');
    ctx    = canvas.getContext('2d');
    document.getElementById('imageLoader')
            .addEventListener('change', handleImage, false);
}

// Read and convert skins
var skins = [];
function handleImage(e) {
    const files   = e.currentTarget.files;
    var x = 0,  y = 0;
    canvas.height = 64;
    // Loop over all selected files
    Object.keys(files).forEach(i => {
        const file = files[i];
        const ext  = file.name.split(".")[1];
        // Alert the user if the file is not an image
        if (["png", "jpg", "jpeg"].find(ex => ex == ext) == undefined) {
            alert(`File ${file.name} is not an image!`);
        } 
        // Process image
        else {
            const reader = new FileReader();
            // Process files once the reader is loaded
            reader.onload = (event) => {
                var img = new Image()
                img.src = event.target.result;
                img.onload = () => {
                    // Make sure the image is exactly 64 by 64 pixels
                    if (img.height != 64 || img.width != 64) {
                        alert('Images MUST be exactly 64x64!')
                        return;
                    }
                    // Compartmentalize each skin into it's own canvas
                    var skin    = document.createElement('canvas');
                    var skinCtx = skin.getContext('2d');
                    // Draw the skin into the canvas, then convert and store it
                    skinCtx.drawImage(img, 0, 0);
                    convertImage(skinCtx);
                    skins.push(skin);
                    // Draw the converted image into the webpage in a grid-like fashion
                    ctx.drawImage(skin,
                        (x == 0 ? x++ : x++ * 64) + 10, 
                        (y == 0 ? 0   : y   * 64) + 10
                    );
                    // Build the main canvas in rows of five
                    if (x % 10 == 0) {
                        x = 0, y++;
                        redraw();
                    }
                }
            }
            // Start reading the input data
            reader.readAsDataURL(file);
        }
    });
}

function convertImage(context) {
    // Blank data
    var temp = context.getImageData(46, 52, 2, 12);

    for (i = 0; i < temp.data.length; i++) {
        temp.data[i] = 0;
    }
    // Right arm, 1st layer
    context.putImageData(context.getImageData(41, 48, 3,  4),  40, 48);
    context.putImageData(context.getImageData(37, 48, 11, 16), 36, 48);
    context.putImageData(temp, 46, 52);
    // Right arm, 2nd layer
    context.putImageData(context.getImageData(53, 48, 11, 16), 52, 48);
    context.putImageData(context.getImageData(57, 48, 3,  4),  56, 48);
    context.putImageData(temp, 62, 52);
    // Left arm, 1st layer
    context.putImageData(context.getImageData(48, 16, 9,  16), 47, 16);    
    context.putImageData(context.getImageData(50, 16, 2,  4),  49, 16);
    context.putImageData(context.getImageData(52, 20, 4,  12), 51, 20);
    // Left arm, 2nd layer
    context.putImageData(context.getImageData(48, 36, 9,  16), 47, 36);    
    context.putImageData(context.getImageData(52, 36, 4,  12), 51, 36);
}

// Redraw the canvas as needed when the canvas is resized.
var canv = document.createElement('canvas'), tempCtx = canv.getContext('2d');
function redraw() {
    // Set the temp canvas size
    canv.width  = canvas.width;
    canv.height = canvas.height;
    // Copy the canvas into the temp storage variable
    tempCtx.drawImage(canvas, 0, 0);
    canvas.height += 74;
    // Redraw canvas from storage after resizing
    ctx.drawImage(canv, 0, 0);
}

// Download the converted image(s)
var output;
function downloadImg() {
    // TODO Download the image, or if more than one is used; zip all and download that. 
    console.log(skins)
    // var download = document.getElementById("download");
    // var image    = document.getElementById("imageCanvas")
    //         .toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    // download.setAttribute("href", image);
    //download.setAttribute("download","archive.png");
}
