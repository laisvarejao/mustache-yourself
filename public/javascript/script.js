var preview = document.querySelector('#preview'); //selects the query named img
 
var canvas = document.querySelector("#canvas");
var sketch = new Processing.Sketch();
var img;

sketch.attachFunction = function(proc) {
  proc.setup = function() {
    proc.background(51);
    proc.size(480, 480);
  };

  function drawMustache() {
    renderImage();
    mustache(proc.mouseX, proc.mouseY, 70);
  }

  function mustache(x, y, len) {
    proc.fill(0);
    proc.beginShape();
    proc.bezier(x + len, y, x + len/2, y, x + len/4, y - len/2, x, y);
    proc.bezier(x - len, y, x - len/2, y, x - len/4, y - len/2, x, y);
    proc.bezier(x - len, y, x - len, y, x, y + len/4, x + len, y);
    proc.endShape();
    proc.smooth(2);
  }

  // mouse event
  proc.mouseClicked = function() {
    drawMustache();
  };
};

function renderImage() {
  if (img) {
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  }
}

function uploadImage() {
  var file    = document.querySelector('#image').files[0];
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

function renderDownload(){
  var link = document.querySelector('#download');
  link.addEventListener('click', function(ev) {
      link.href = canvas.toDataURL();
  }, false);
}

window.onload = function(){
  // attaching the sketch to the canvas
  new Processing(canvas, sketch);
  renderDownload();
}