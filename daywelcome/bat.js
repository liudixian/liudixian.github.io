function Bat(x, y, d) {

    let D = d;
    this.x = x;
    this.y = y;

    this.show = function (unit, dir, active, mode) {
        this.unit = unit;
        d = unit * 10;
        let iconRatio = arrow.width / arrow.height;
        let iconH = D / 2;
        let iconW = iconH * iconRatio;
        this.dir = dir;
        this.mode = mode;
        let speed = 3;

        if (mode === 'mobile') {
            let angle = map(rotationY, -20, 20, 0, width);
            this.x = angle;
        } else {
            if (keyIsDown(65)) {
                this.x -= speed;
            } else if (keyIsDown(68)) {
                this.x += speed;
            }
        }




        push();
        translate(this.x, this.y);
        let offset = (D - iconH) * 0.5;
        if (active) {
            // fill(255, 20);
            noFill();
            stroke(255, 20);
            ellipse(0, 0, D, D);
            rotate(dir);
            imageMode(CENTER);
            image(arrow, 0, 0 - offset, iconW, iconH);
        }
        pop();

        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        noStroke();
        fill(255);

        rect(0, 0, unit * 3.0, unit * 0.5);

        pop();



        if (this.x < unit * 3.25) {
            this.x = unit * 3.25;
        } else if (this.x > width - unit * 3.25) {
            this.x = width - unit * 3.25;
        }
    }


}

