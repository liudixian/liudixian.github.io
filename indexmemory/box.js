function myBox(x, y, w, h) {
  var options = {
    friction: 0,
    restitution: 0.65,
    mass: 0.1
  };
  // this.body = Bodies.circle(x, y, r, options);
  this.body = Bodies.rectangle(x,y, w,h, options);
  // this.r = r;
  this.w = w;
  this.h = h;

  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    // ellipse(0, 0, this.r * 2);
    rect(0,0,this.w, this.h);
    pop();
  };
}