function Block(img, maxpixeslW) {
    this.img = img;
    this.maxpixeslW = maxpixeslW;   //统一原始图片的dpi
    this.ratio = img.width / img.height;
    this.showselctor = true;
    this.statusList = [];

    console.log("原始图片像素宽： " + img.width + '\n' + "图片比例： " + this.ratio);
    img.resize(maxpixeslW, maxpixeslW / this.ratio);
    console.log("新图片宽： " + img.width);





    this.colorSelector = function (yoffset, xoffset ) {
        //选取像素
        this.yoffset = yoffset;
        this.xoffset = xoffset;
        let colorList = [];    //颜色数组
        this.img.loadPixels();
        let selecRatio = 0.2;
        //选取原点
        let orin = createVector(img.width * (1 - selecRatio), img.height * (1 - selecRatio));
        //选取尺寸
        let size = createVector(img.width * selecRatio, img.height * selecRatio);
        let cLength = ((orin.x + size.x) + (orin.y + size.y) * size.x) * 4;
        console.log(size.x);
        // image(this.img, 0,0);
        // strokeWeight(2);
        // stroke(255,00,0);
        // noFill();
        // rect(orin.x , orin.y , size.x, size.y);


        // for(let i =0; i < size.x; i ++){
        //     for( let j = 0; j < size.y; j++){
        //         let index = (orin.x + i + (orin.y + j) * size.x) * 4;
        //         let r = this.img.pixels[index];
        //         let g = this.img.pixels[index + 1];
        //         let b = this.img.pixels[index + 2];
        //         let a = this.img.pixels[index + 3];
        //         let c = color(r, g, b, a);
        //         console.log(this.img.width);
        //         noStroke();
        //         fill(r, g, b, a);
        //         rect(i * 4, j * 4, 4,4);   
        //     }
        // }


        // let index = (orin.x + orin.y * size.x);
        // let cIndex =0;
        // for (let i = index; i < cLength; i ++) {
        //     colorList[cIndex] = this.img.loadPixels[index];
        //     cIndex ++;

        //     console.log(img.loadPixels[index]);

        // }

    }

    // this.showColorSelector = function(x, y, w, h, x_, y_, w_, h_, d){
    //     this.size = createVector(w * d, h * d);
    //     this.size_ = createVector(w_ * d, h_ * d);

    //     if(x >0 && x < size.x && y >0 && y < size.y){
    //         if(this.showselctor){
    //             fill(210,0,100);
    //             rect(0,0, w , h);
    //             fill(0,200,100);
    //             rect(x_, y_, w_, h_);
    //         }
    //     }
    // }

    this.show = function (status) {
        //if false;
        //反向
        // list.v == 0;
    }

    this.checkedge = function (list) {
        // if list.v == 1
        //return false;
        //send color value to new list;
    }

    function data() {
        //orgin image
        //oriin list
        //new list

        this.show = function () {
            //if(1){ show color }
            //else display black;
        }
    }
}


