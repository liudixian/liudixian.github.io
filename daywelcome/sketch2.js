var ping;
var pic;
let loc;
let vel;
let acc;
let maxSpeed = 5;
let unit; //显示限速最小单元
// let r = 10;


let bottom;
let bW = 40;
let disH;
let ratio = 0.462; //手机屏幕比例
let disW;

let r;
let halfR

var arrow;  //箭头
var bat;    //移动板
let mode;
let x, y;
let arrowStatus;  //是否激活
let isDeviceMove;


//状态表
let status = [];
let pixelW;
let pixelH;
let imgRatio;

let value = 0;
let threshold = 0.5;
var ua = navigator.userAgent;

//适配
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

    isAndroid = ua.match(/(Android)\s+([\d.]+)/),

    isMobile = isIphone || isAndroid;

if (isMobile) {
    mode = 'mobile';
} else {
    mode = 'pc';
}


function preload() {
    arrow = loadImage('icon/arrow2.png', img => {
        // print("icon 导入成功");
        console.log("icon 导入成功");
    });

    pic = loadImage('pic/pic.jpg');
}

function setup() {
    disH = windowHeight * 0.9;
    disW = disH * ratio;
    r = disH * 0.016;

    a = width * 0.5;
    // mode = 'mobile';


    var cnv = createCanvas(disH * ratio, disH, P2D); //手机屏幕比例
    frameRate(60);
    x = width * 0.5;
    y = height * 0.98;
    unit = round(height * 0.02);
    halfR = unit * 0.5;
    cnv.parent('sketchDiv');
    background(0);

    loc = createVector(width * 0.5, height * 0.95);
    vel = createVector(0, 0);
    acc = createVector();
    acc.set(-2, -4);

    bottom = createVector(0, 0.95 * height);
    bat = new Bat(x, y, 420);

    //图片初始化
    imgRatio = pic.width / pic.height;   //图片比例
    pic.resize(width, width / imgRatio);

    //初始化状态表
    pixelW = round(width / unit);
    pixelH = round(height / unit);
    setupStatus(pixelW, pixelH, status);

    console.log("像素宽高：" + pixelW, pixelH);
}


function setupStatus(pixSumX, pixSumY, status) {

    let a = pixSumX * (height * 0.5) / unit;
    //将图片的像素信息传入到status
    for (let i = 0; i < pixSumX * pixSumY; i++) {
        if (i < a) {
            status[i] = 1;
        } else {
            status[i] = 0;
        }
    }

    console.log("status: ");
    console.log(status);

}

function showpixels(list, pic) {
    pic.loadPixels();
    //颜色选区原点位置
    let d = pixelW / pic.width;
    let currenX = pic.width - 200;
    let currenY = pic.height - 200;
    let pos = createVector(-1, -1);
    // console.log(currenY, currenY);

    if (list != null) {
        for (let i = currenX; i < currenX + pixelW; i += 1) {
            pos.x ++;
            pos.y =-1;
            for (let j = currenY; j < currenY + pixelH; j += 1) {
                let index = i + j * pixelW;
                pos.y ++;
                let listIndex = pos.x + pos.y * pixelW;
                let v = list[listIndex];
                //颜色
                let r = pic.pixels[index * 4];
                let g = pic.pixels[index * 4 + 1];
                let b = pic.pixels[index * 4 + 2];
                let a = pic.pixels[index * 4 + 3];

                //  console.log(i, j);

                // background(color(r, g, b, a));

                if (v === 1) {
                    push();
                    noStroke();
                    translate(pos.x * unit, pos.y * unit);
                    fill(color(r, g, b, a));
                    // fill(255);
                    rect(0, 0, unit, unit);
                    pop();
                   
                }
            }
        }
    }
}

function checkStatus(pos, list) {
    let pX = round(pos.x / unit);
    let pY = round(pos.y / unit);
    let p0 = createVector(pX - 1, pY - 1);
    let p1 = createVector(pX, pY - 1);
    let p2 = createVector(pX + 1, pY - 1);

    //周围五个像素
    let pStatus = [];
    pStatus[0] = list[p0.x + p0.y * pixelW];
    pStatus[1] = list[p1.x + p1.y * pixelW];
    pStatus[2] = list[p2.x + p2.y * pixelW];

    if (pStatus[0] === 1) {
        list[p0.x + p0.y * pixelW] = 0;
        console.log("碰撞");
        pong(pos);
    }
    if (pStatus[1] === 1) {

        list[p1.x + p1.y * pixelW] = 0;
        console.log("碰撞");
        pong(pos);

    }
    if (pStatus[2] === 1) {

        list[p2.x + p2.y * pixelW] = 0;
        console.log("碰撞");
        pong(pos);

    }
}

function draw() {
    background(0);


    randomSeed(0);
    let step = 10;
    let d = pixelDensity();
    pic.loadPixels();
    let halfImage = 4 * (pic.width * d) * (pic.height / 2 * d);


    //绘制图片
    // for(let i =1; i <pic.width; i+=step){
    //     for(let j=1; j< pic.height; j+=step){
    //         let index = (i+j*pic.width)*4;
    //         // let index = int(random(width*pic.height*4));
    //         let r = pic.pixels[index];
    //         let g = pic.pixels[index+1];
    //         let b = pic.pixels[index+2];
    //         let a = pic.pixels[index+3];

    //         let c = color(r,g,b,a);
    //         fill(c);
    //         noStroke();
    //         rect(i,j,step,step);
    //         // console.log(pixels[index]);
    //     }

    // }
    // pic.updatePixels();

    showpixels(status, pic);

    //箭头指向， 移动板
    let angle = map(mouseX, 0, width, -PI / 2, PI / 2);
    bat.show(unit, angle, arrowStatus, mode);

    //pingpong
    update();
    checkBounder();
    checkStatus(loc, status);
    push();
    fill(255);
    rect(loc.x, loc.y, unit, unit);
    pop();
    //调试
    // debug();
}


function touchStarted() {
    arrowStatus = true;
}

function touchEnded() {
    arrowStatus = false;
}

function mouseDragged() {
    arrowStatus = true;
}




function update() {
    loc.add(vel);
    vel.add(acc);
    vel.limit(maxSpeed);

    acc.mult(0);
}

function checkBounder(v) {
    if (loc.x < halfR) {
        loc.x = halfR;
        vel.x *= -1;
    } else if (loc.x > width - halfR) {
        loc.x = width - halfR;
        vel.x *= -1;
    }

    if (loc.y < halfR) {
        loc.y = halfR;
        vel.y *= -1;
    } else if (loc.y > bat.y - halfR && loc.y < bat.y + halfR && loc.x < bat.x + unit * 3 && loc.x > bat.x - unit * 3 && loc.y < height + unit * 3) {
        loc.y = bottom.y - halfR;
        vel.y *= -1;
    } else if (loc.y > height + unit * 3) {
        gameOver();
        //    console.log("game over");
    }
}

function pong(pos) {
    loc.y = pos.y;
    vel.y *= -1;
}


function debug() {
    push();
    fill(255);
    text(mode, 10, height * 0.9);
    text(rotationY, 10, height * 0.9 + 10);
    pop();
}

function boarder(x, y, w, h) {

}


function windowResized() {
    disH = windowHeight;
    disW = disH * ratio;
    r = disH * 0.016;
    halfR = r * 0.5;


    var cnv = createCanvas(disH * ratio, disH);
    cnv.parent('sketchDiv');
    background(0);



}


function mousePressed() {
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        let fs = fullscreen();
        fullscreen(!fs);

        disH = windowHeight;
        disW = disH * ratio;
        r = disH * 0.016;
        halfR = r * 0.5;


        var cnv = createCanvas(disH * ratio, disH);
        cnv.parent('sketchDiv');
        background(0);


    }
}


function update() {
    loc.add(vel);
    vel.add(acc);
    vel.limit(maxSpeed);

    acc.mult(0);
}

function gameOver() {
    push();
    fill(0);
    rect(0, 0, width, height);
    textSize(14);
    fill(255);
    textAlign(CENTER, CENTER);
    text("你输了。 再来一局？", width * 0.5, height * 0.5);
    pop();
}