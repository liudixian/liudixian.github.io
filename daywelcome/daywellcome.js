let img = [];

function preload(){
    img[0] = loadImage("pic/man.jpg");
    img[1] = loadImage("pic/woman.jpg");
    img[2] = loadImage("pic/woman2.jpg");
}


function setup(){
    // createCanvas(1440, 1080);
}

function draw(){
    createA('http://p5js.org/', 'this is a link');
}