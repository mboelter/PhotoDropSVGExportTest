var cp;
var gui;

var img = new Array(35);
var imgIndex = 1;
var thresholdValue = 70;

var radius = 5;
var saveSvg = false;

var fillColor = 255;
var number_of_images = 34;



function preload() {
    for (var i = 1; i <= number_of_images; i++) {
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

    image(img[imgIndex], 0, 0, 600, 600);
    console.log(img[imgIndex].get(mouseX, mouseY));

    // drawPixelated(img[imgIndex]);
}



function drawPixelated(refImg) {
    refImg.loadPixels();
    loadPixels();

    var w = refImg.width,
        h = refImg.height;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {

            var color = refImg.get(x, y);

            fillColor = 0;

            // just taking any one channel and nothing else
            if (color[0] > cp.threshold_value) {
                fillColor = 255;
            }
            fill(fillColor);
            noStroke();
            ellipse(x, y, cp.ellipseSize, cp.ellipseSize);
        }
    }
}

var initGUI = function() {
    gui.add(cp, 'change_image');
    gui.add(cp, 'threshold_value', 10, 200);
    gui.add(cp, 'ellipseSize', 2, 20);
    gui.add(cp, 'save_svg');
};

var Controls = function() {

    this.change_image = function() {
        imgIndex++;
        if (imgIndex > number_of_images) {
            imgIndex = 1;
        }
    };

    this.threshold_value = 80;
    this.ellipseSize = 8;

    this.save_svg = function() {
        save();
    };
};