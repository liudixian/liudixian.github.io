

ArrayList<PVector> targets;

SLine[] LS;     //线条数组

PVector rand = new PVector();
float nt = 0;


int n = 6;

void setup() {
  size(600, 600);
  background(255, 255, 255, 255);
  targets = new ArrayList<PVector>();

  //l1 = new SLine();
  //l2 = new SLine();
  //l3 = w SLine();



  LS = new SLine[n];
  for (int i =0; i <n; i ++) {
    LS[i] = new SLine();
  }

  for (int i=0; i <2; i ++) {
    targets.add(new PVector(0, 0));
  }
}

void draw() {
  background(255, 255, 255, 255);

  targets.set(0, new PVector(mouseX, mouseY));


  //l1.go(target);
  //l2.go(l1.pos);
  //l3.go(l2.pos);
  //LS[0].go(target);


  float randX = noise(nt) * width-10;

  rand.set(randX, height/2);

  targets.set(1, rand);
  //ellipse(rand.x, rand.y, 10, 10);

  nt += 0.005;
  follow(n, targets.get(0));
  
  //switchPersen(targets);
}


void follow(int ss, PVector m) {

  LS[ss-1].go(m);

  while (ss-1 >0) {
    ss--;
    PVector S = LS[ss].pos;
    LS[ss-1].go(S);
    //println(ss);
  }
}

void switchPersen(ArrayList<PVector> ls) {

  int sum = ls.size();
  println(ls);
  switch(sum)
  {
  case(0):

    break;

  case(1):

    follow(6, ls.get(0));
    break;
 case(2):
    
    follow(3, ls.get(0));
 
    break; 

  }
}

class SLine
{
  PVector pos, acc, vel, l4;
  PVector  d, s;

  float m ;
  float maxSpeed;
  float maxForce;

  SLine() {

    
    m = 1;
    maxSpeed = 4;
    maxForce = 0.2;

    pos = new PVector(random(width), 0);
    acc = new PVector(0, 0);
    vel = new PVector(0, 0);
    d = new PVector(0, 0);
    s = new PVector(0, 0);
  }




  void update() {

    vel.add(acc);
    vel.limit(maxSpeed);
    pos.add(vel);
    acc.mult(0);
  }


  //其他外力
  void addforce(PVector force) {
    PVector f = PVector.div(force, m);
    acc.add(f);
  }

  void display() {
    strokeWeight(2);
    //stroke(#3858E8,20);
    stroke(0,40);
    //line(pos.x, 0, pos.x, height);
    //noFill();
    fill(#4AA5FF,30);
    rect(0,0,pos.x, pos.y);
    
    fill(#ffffff,30);
    rect(pos.x, pos.y,width,height);
    
    fill(#FFCB24,30);
    rect(0, pos.y, pos.x, height);

    fill(#6864FF,30);
    rect(pos.x, 0,width,pos.y);
  }

  void arrivd(PVector t) {
    PVector desir = PVector.sub(t, pos);
    float dist = desir.mag();

    if (dist < 200) {
      float df = map(dist, 0, 100, 0, maxSpeed);
      desir.setMag(df);
    } else {
      desir.setMag(maxSpeed);
    }

    PVector steer = PVector.sub(desir, vel);
    steer.limit(maxForce);

    addforce(steer);

    //PVector s = vel.copy().normalize();
    //s.mult(-0.05*m);
    //addforce(s);
  }
  
    void go(PVector target) {
    arrivd(target);
    update();

    display();
  }
}

/*
@ss: 总线数
 */

class Sys {
  SLine ls[];        //Sline 数组

  int ss; //总线数

  Sys(int sum) {
    ss = sum;
    ls = new SLine[ss];        //声明线数组

    for (int i =0; i <ss; i ++) {
      ls[i] = new SLine();
    }
  }



}