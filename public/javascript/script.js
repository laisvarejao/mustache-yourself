var canvas = document.querySelector("#canvas");
var img;
var x;
var y;

const max = 600;

var sketch = new Processing.Sketch();

sketch.attachFunction = function(proc) {
  proc.setup = function() {
    proc.background(255);
    proc.size(max, max);
  };

  proc.resizeCanvas = function (width, height) {
    proc.size(width, height);
  }

  proc.drawMustache = function(size) {
    renderImage(function() {
      mustache(size);
    });
  }

  function mustache(len) {
    proc.fill(0);
    proc.beginShape();
    proc.bezier(x + len, y, x + len/2, y, x + len/4, y - len/2, x, y);
    proc.bezier(x - len, y, x - len/2, y, x - len/4, y - len/2, x, y);
    proc.bezier(x - len, y, x - len, y, x, y + len/4, x + len, y);
    proc.endShape();
  }

  // mouse event
  proc.mouseClicked = function() {
    x = proc.mouseX;
    y = proc.mouseY;

    var size = parseInt(document.querySelector('#size-range').value);
    proc.drawMustache(size);
  };
};

// attaching the sketch to the canvas
var proc = new Processing(canvas, sketch);
renderRangeInput();
renderDownload();

function scaledWidth() {
  return (img.width < max) ? img.width : max;
}

function scaledHeight(width) {
  return (width * img.height) / img.width; 
}

function renderImage(callback) {
  if (img) {
    var context = canvas.getContext("2d");

    var width = scaledWidth();
    var height = scaledHeight(width);

    proc.resizeCanvas(width, height);
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
    typeof callback === 'function' && callback();
  }
}

function uploadImage() {
  var file    = document.querySelector('#upload-btn').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    img = new Image();
    img.src = reader.result;
    document.querySelector('#upload-file').value = img.src;

    img.onload = function() {
      renderImage();
    };
  }

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  }
}

function renderRangeInput() {
  var range = document.querySelector('#size-range');
  range.defaultValue = canvas.width/8;
  range.min = 0;
  range.max = canvas.width/4;
  
  range.addEventListener('change', function(ev) {
    range.defaultValue = parseInt(range.value);
    proc.drawMustache(parseInt(range.value));
  }, false);
}

function renderDownload(){
  var link = document.querySelector('#download');
  link.addEventListener('click', function(ev) {
      link.href = canvas.toDataURL();
  }, false);
}