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
            }

            fill(fillValue);
            ellipse(x * vScale, y * vScale, vScale, vScale);
        }
    }
}


function drawSVG() {
    vScale = cp.Pixel_Size;

    if (vScale != oldVScale) {
        video.size(width / vScale, height / vScale);
        oldVScale = vScale;
    }

    video.loadPixels();
    loadPixels();

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, 'width', '640');
    svg.setAttributeNS(null, 'height', '480');
    svg.setAttributeNS(null, 'version', '1.1');

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            var index = (x + y * video.width) * 4;

            var r = video.pixels[index];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];
            var a = video.pixels[index + 3];

            var brightness = (r + g + b) / 3; // grey scale value

            if (brightness > cp.Threshold) {
                fillValue = 'white';
            } else {
                fillValue = 'black';
            }

            var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttributeNS(null, "fill", fillValue);
            circle.setAttributeNS(null, "stroke", "none");
            circle.setAttributeNS(null, "cx", x * vScale);
            circle.setAttributeNS(null, "cy", y * vScale);
            circle.setAttributeNS(null, "r", vScale);
            svg.appendChild(circle);
        }
    }
    var wrapper = document.getElementById('svg-wrapper');
    wrapper.appendChild(svg);

    var textarea = document.getElementById('svg-as-text');
    textarea.value = svg.outerHTML;

    window.xxx = svg;
};


var initGUI = function() {
    gui.add(cp, 'Threshold', 10, 200);
    gui.add(cp, 'Pixel_Size', 5, 20);
    gui.add(cp, 'Save_SVG');
};



var Controls = function() {
    this.Threshold = 80;
    this.Pixel_Size = 8;

    this.Save_SVG = function() {
        drawSVG();
    };
};