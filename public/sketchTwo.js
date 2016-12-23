var video;

var vScale = 8;
var oldVScale = 0;

var cp;
var gui;

var fillValue;
var saveFlag = false;
var svg;

var counter = 0;

function setup() {
    createCanvas(640, 480);

    pixelDensity(1);

    video = createCapture(VIDEO);

    noStroke();

    cp = new Controls();
    gui = new dat.GUI();
    initGUI();

    //------------starting tags of svg
    svg = '<svg width="640" height="480" version="1.1" xmlns="http://www.w3.org/2000/svg">';
}

function draw() {
    background(255);

    vScale = cp.Pixel_Size;

    if (vScale != oldVScale) {
        video.size(width / vScale, height / vScale);
        oldVScale = vScale;
    }


    video.loadPixels();
    loadPixels();


    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            var index = (x + y * video.width) * 4;

            var r = video.pixels[index];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];
            var a = video.pixels[index + 3];

            var brightness = (r + g + b) / 3; // grey scale value

            if (brightness > cp.Threshold) {
                fillValue = 255;
            } else {
                fillValue = 0;

                // svg += '<circle fill="black" stroke="none" cx="' + x * vScale + '" cy="' + y * vScale + '" r="' + vScale + '" >< /circle>';

                // if (saveFlag) {
                //     //------------closing tag of svg
                //     svg += '</svg>';
                //     console.log(svg);
                //     saveFlag = false;
                //     svg = '';
                //     svg = '<svg width="640" height="480" version="1.1" xmlns="http://www.w3.org/2000/svg">';
                // }
            }

            fill(fillValue);
            ellipse(x * vScale, y * vScale, vScale, vScale);
        }
    }
}


var initGUI = function() {
    gui.add(cp, 'Threshold', 10, 200);
    gui.add(cp, 'Pixel_Size', 5, 20);
    gui.add(cp, 'Save_SVG');
};



var Controls = function() {
    this.Threshold = 80;
    this.Pixel_Size = 8;

    this.Save_SVG = function() {
        // save();
        saveFlag = true;
    };
};