var trex,trexWalkingImg,ground,groundImg,invisibleGround,cloudsImg,obsImg1,obsImg2,obsImg3,obsImg4,obsImg5,obsImg6,score=0,CloudsGroup,ObstaclesGroup,gameOver,restart,gameoverImg,restartImg;
var dieSound,jumpSound,checkpointSound,trexcollideImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
trexWalkingImg  =loadAnimation('trex1.png','trex3.png','trex4.png')
groundImg =loadImage("ground2.png")  
cloudsImg = loadImage("cloud.png")
  obsImg1=loadImage("obstacle1.png");
  obsImg2=loadImage("obstacle2.png");
  obsImg3=loadImage("obstacle3.png");
  obsImg4=loadImage("obstacle4.png");
  obsImg5=loadImage("obstacle5.png");
  obsImg6=loadImage("obstacle6.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  dieSound=loadSound("die.mp3");
  jumpSound=loadSound("jump.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
  trexcollideImg=loadImage("trex_collided.png");
  
  
}

function setup() {
   createCanvas(600, 400);
   trex = createSprite(40,350,20,20);
   trex.addAnimation("walking",trexWalkingImg); 
   trex.scale = 0.5; 
   ground = createSprite(300,380,600,20);
   ground.addImage("groundm",groundImg);
   ground.velocityX = -3;  
   ground.x = ground.width/2;
   invisibleGround = createSprite(300,390,600,10);    invisibleGround.visible = false;   
  edges = createEdgeSprites(); 
  ObstaclesGroup = createGroup();
  CloudsGroup = createGroup();
  gameOver = createSprite(300,300);
  restart = createSprite(200,340);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 0.5;
  restart.addImage(restartImg);
  restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
 //set background to white
  background(180);
  //display score

  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (score>0 && score%100 === 0){
      checkpointSound.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
      jumpSound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){      
      gameState = END;
      dieSound.play();
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addImage(trexcollideImg);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }

  textSize(20);
  text("score"+score,500,140);
  trex.collide(invisibleGround);
  drawSprites(); 
  
}

function spawnClouds() {
  if (frameCount%60===0) {
    var clouds = createSprite(600,random(280,320),20,20)
    clouds.velocityX = -5;
    clouds.addImage("cloud",cloudsImg);
    clouds.scale = 0.7;
    clouds.lifetime=600/5; 
    clouds.depth = trex.depth-1;
    //add each cloud to the group
    CloudsGroup.add(clouds);
}}   


function spawnObstacles() {
  if (frameCount%60===0) {
    var Obstacles = createSprite(600,370,20,20)
    Obstacles.velocityX = -7;
    //add each obstacle to the group
    ObstaclesGroup.add(Obstacles);
    
    Obstacles.scale = 0.6;
    Obstacles.lifetime=600/7; 
    
    var n=Math.round(random(1,6));
    //console.log(n);
    switch(n){
      case 1:  Obstacles.addImage(obsImg1);
              break;
      case 2:  Obstacles.addImage(obsImg2);
             break;
      case 3:  Obstacles.addImage(obsImg3);
             break;
      case 4:  Obstacles.addImage(obsImg4);
             break;
      case 5:  Obstacles.addImage(obsImg5);
             break;
      case 6:  Obstacles.addImage(obsImg6);
      default:  break; 
    }
    
}}