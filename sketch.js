var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var obstacle1,obstacle2,obstacle3,obstaclesGroup;
var obstacle1Img,obstacle2Img,obstacle3Img;
var deaths=0;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  obstacle1Img=loadImage("obstacle1.png");
  obstacle2Img=loadImage("obstacle2.png");
  obstacle3Img=loadImage("obstacle3.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
obstaclesGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  console.log(boy.x)
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    spawnObstacles();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
    }else{
      if(swordGroup.isTouching(boy)) {
        deaths=deaths+1;
        swordGroup.destroyEach();
    }
  }
  if(deaths===5){
    gameState=END;
    swordGroup.destroyEach();
  }

  if(gameState===END){
    boy.addAnimation("SahilRunning",endImg);
    boy.scale=0.5;
    boy.x=200;
    boy.y=300;
    
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
    
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
    
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach(0);
    
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);
    
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityYEach(0);
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  
}

function createCash() {
  if (World.frameCount % 70 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function spawnObstacles(){
  var obstacles=Math.round(random(1,3));
  if(frameCount%160===0){
  if(obstacles===1){
    obstacle1=createSprite(Math.round(random(50,350)),40,10,10);
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale=0.1;
    obstacle1.velocityY=3;
    obstacle1.lifetime=150;
    obstaclesGroup.add(obstacle1);
  }else if(obstacles===2){
    obstacle2=createSprite(Math.round(random(50,350)),40,10,10);
    obstacle2.addImage(obstacle2Img);
    obstacle2.scale=0.1;
    obstacle2.velocityY=3;
    obstacle2.lifetime=150;
    obstaclesGroup.add(obstacle2);
  }else{
    obstacle3=createSprite(Math.round(random(50,350)),40,10,10);
    obstacle3.addImage(obstacle3Img);
    obstacle3.scale=0.1;
    obstacle3.velocityY=3;
    obstacle3.lifetime=150;
    obstaclesGroup.add(obstacle3);
  }
}
}