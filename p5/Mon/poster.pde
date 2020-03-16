boolean record;

ArrayList<Box>  sponge; //海绵对象数组
float a;


void setup() {
  size(600, 600, P3D);
  sponge = new ArrayList<Box>();
  Box b = new Box(0, 0, 0, 200);
  a = 0;

  sponge.add(b);
}


void mousePressed() {
  //Genereate next set of boxes

  ArrayList<Box> next  = new ArrayList<Box>();      //下一代boxes对象组

  for (Box b : sponge) {
    //对于sponge容器里的所有对象（只有一个）执行generate()函数，生成一个ArryList<Box>对象容器,并赋给newBoxes
    ArrayList<Box> newBoxes = b.generate();   
    next.addAll(newBoxes);    //将newBoxes里的所有对象传到next对象容器中
  }
  sponge = next;             //生成下一代sponge对象容器，完成递归运算
}


void draw() {
  background(0);
  
//   if (record) {//导出obj
//     beginRecord("nervoussystem.obj.OBJExport", "filename.obj");
//   }



  //noFill();
  //lights();
  pointLight(255, 255, 255, 0, 0, -100);
  //pointLight(100,100,200,width,height,-100);
  noStroke();

  pushMatrix();
  translate(width/2, height/2);
  stroke(255);
  rotateX(a);
  rotateY(a*0.4);
  rotateZ(a*0.2);
  for (Box b : sponge) {
    b.show();
  }

  popMatrix();

  a  += 0.01;

  if (record) {
    endRecord();
    record = false;
  }
}

void keyPressed() {
  if (key =='r') {
    saveFrame();
    record = true;  //导出obj
  }
}


class Box {
  PVector pos;
  float r;


  Box(float x, float y, float z, float r_) {
    pos = new PVector(x, y, z);
    r= r_;
  }

///海绵的分型递归

  ArrayList<Box> generate() {
    ArrayList<Box> boxes = new ArrayList<Box>();
    for (int x=-1; x<2; x++) {
      for (int y=-1; y<2; y++) {
        for (int z=-1; z<2; z++) {
          int sum = abs(x)+ abs(y) + abs(z);      
          float newR = r/3;        //每一次边长缩短为上一代的三分之一
          
          if(sum>1){//当box原点不在坐标系原点或者x/y/z轴上时，画box
            Box b = new Box(pos.x+x*newR, pos.y+y*newR, pos.z+z*newR, newR);  
            boxes.add(b);
          }
        }
      }
    }
    return boxes;
  }



  void show() {
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    fill(255);
    noStroke();
    box(r);
    popMatrix();
  }
}