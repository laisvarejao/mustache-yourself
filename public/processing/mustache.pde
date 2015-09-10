void setup() {
  size(500,500);
  background(125);
  fill(255);
  // noLoop();
}

void draw() { 
  text("Hello Web!",20,20);
  println("Hello ErrorLog!");
}

void mouseClicked() {
  background(255);
  moustache(mouseX, mouseY, 200);
}

void moustache(x, y, len) {
  fill(0);
  beginShape();
  bezier(x + len, y, x + 100, y, x + 50, y - 100, x, y);
  bezier(x - len, y, x - 100, y, x - 50, y - 100, x, y);
  bezier(x - len, y, x - len, y, x, y + 100, x + len, y);
  endShape();
}