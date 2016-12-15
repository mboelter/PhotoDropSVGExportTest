var cp;
var gui;

var img = new Array(35);
var imgIndex = 1;
var thresholdValue = 70;

var radius = 5;
var saveSvg = false;

var fillColor = 255;


function preload() {
    for (var i = 1; i <= 34; i++) {
        img[i] = loadImage("/images/" + i + ".jpg");
    }
}


function setup() {
    createCanvas(600, 600, SVG);

    background(255);

    cp = new Controls();
    gui = new dat.GUI();
    initGUI();
}

function draw() {

    background(255);

    // image(img[imgIndex], 0, 0, 600, 600);
    // console.log(img[imgIndex].get(mouseX, mouseY));

    drawPixelated(img[imgIndex]);
    oldImgIndex = imgIndex;
}



function drawPixelated(refImg) {
    refImg.loadPixels();
    if (refImg.pixels.length > 0) {
        var w = refImg.width,
            h = refImg.height;

        for (var y = 4; y < h; y += cp.steps) {
            for (var x = 4; x < w; x += cp.steps) {

                var color = refImg.get(x, y);

                fillColor = 0;

                // just taking any one channel and not alpha
                if (color[0] > cp.threshold_value) {
                    fillColor = 255;
                }
                fill(fillColor);
                noStroke();
                ellipse(x, y, cp.ellipseSize, ep.ellipseSize);
            }
        }
    }
}

var initGUI = function() {
    gui.add(cp, 'change_image');
    gui.add(cp, 'threshold_value', 10, 200);
    gui.add(cp, 'steps', 2, 20);
    gui.add(cp, 'ellipseSize', 2, 20);
    gui.add(cp, 'save_svg');
};

var Controls = function() {

    this.change_image = function() {
        imgIndex++;
        if (imgIndex > 34) {
            imgIndex = 1;
        }
    };

    this.threshold_value = 70;
    this.steps = 8;
    this.ellipseSize = 8;

    this.save_svg = function() {
        save();
    };
};