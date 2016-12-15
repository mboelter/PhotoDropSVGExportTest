var controlParameters;
var gui;
var file;
var fr;

var img = new Array(35);
var imgIndex = 1;
var thresholdValue = 0.0;
var oldThresholdValue = 0.4;
var scanning = false;
var scX = 5;
var scY = 5;
var radius = 5;


function preload() {
    for (var i = 1; i <= 34; i++) {
        img[i] = loadImage("/images/" + i + ".jpg");
    }
}


function setup() {
    createCanvas(1200, 600, SVG);

    background(125);

    cp = new Controls();
    gui = new dat.GUI();
    initGUI();

    frameRate(5);
}

function draw() {
    background(125);

    thresholdValue = cp.threshold_value;
    if (thresholdValue != oldThresholdValue) {
        img[imgIndex].filter("threshold", thresholdValue);
        console.log(thresholdValue);
        oldThresholdValue = thresholdValue;
    }
    image(img[imgIndex], 0, 0, 600, 600);
    
    // If commet teh codes up and uncomment these parts,  the shape of the circle changes with 
    // "threshold" slider value
    // fill(50);
    // noStroke();
    // ellipse(width / 2, height / 2, map(thresholdValue, 0.0, 1.0, 10, 200), map(thresholdValue, 0.0, 1.0, 10, 200));
}

var initGUI = function() {
    gui.add(cp, 'change_image');
    gui.add(cp, 'threshold_value', 0.0, 1.0);
    gui.add(cp, 'start_scanning');
    gui.add(cp, 'stop_scanning');
    gui.add(cp, 'XSteps', 0, 255);
    gui.add(cp, 'YSteps', 0, 255);
    gui.add(cp, 'ellipseSize', 0, 255);
    gui.add(cp, 'reset');
};

var Controls = function() {

    this.change_image = function() {
        newImage = true;
        imgIndex++;
        if (imgIndex > 34) {
            imgIndex = 1;
        }
    };

    this.threshold_value = 0.5;

    this.start_scanning = function() {
        // console.log("scanning started");
        scanning = true;
    };

    this.stop_scanning = function() {
        // console.log("scanning stopped");
        scanning = false;
    };

    this.XSteps = 5;
    this.YSteps = 5;
    this.ellipseSize = 5;

    this.reset = function() {
        console.log("reset");
        resetEverything();
    };
};

function resetEverything() {
    scanning = false;
    cp.XSteps = 5;
    cp.YSteps = 5;
    radius = 5;
}