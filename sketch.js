var gameState = "serve";
var description = "With the increase and rise of pollution \n around the world this game focusses\n on encountering pollution in a fun \n and interactive way";
var button;
var bg ,bgImg,serveTree,serveTreeImg,serveInvisibleGround;
var player,ground,topGround,topGroundGroup,seedGroup;
var half,seedCount=0,pollution,pollutionGroup;

function preload(){
  serveTreeImg = loadImage("tree.png");
  playBg = loadImage("li.jpg");
  getBackground();
  
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  half = displayWidth / 2;
  button= createButton("Lets Plant");
  button.position(displayWidth/2,displayHeight/2+270);
  console.log(frameRate);
  serveTree = createSprite(displayWidth-displayWidth+200, displayHeight-50);
  serveTree.addImage(serveTreeImg);
  serveTree.scale = 0.09;

  //to be changed
  serveTree.velocityX = 10;
  serveInvisibleGround = createSprite(displayWidth-20, displayHeight +100, 20, displayHeight);
  serveInvisibleGround.visible = false;
  
  ground = createSprite(displayWidth / 2, displayHeight - 30, displayWidth+displayWidth/2+displayWidth/2, 20);
  ground.x = ground.width / 2;
  player = createSprite(40, displayHeight - 70, 40, 60);
   ground.visible = false;
  player.visible = false;
  
  topGroundGroup = new Group();
  seedGroup = new Group();
  pollutionGroup = new Group();
  // description.velocityX = -3;
  //  bg = createSprite(200,200, 500, 500);
  //  bg.addImage("hello",bgImg);
}

function draw() {
   //  if (gameState == "serve") {
   //    bg.addImage(bgImg);
   //  }
   // else {
   //    bg = null;
   //  }

 
  // if (gameState=="serve" && keyDown==32) {
  //   gameState = "play";
  // }
  if (gameState == "serve") {
    background(bg);
   
    if (serveTree.isTouching(serveInvisibleGround)) {
      serveTree.velocityY = 0;
      gameState = "play";
    }
  }
  if (gameState == "play") {
     background(playBg);
    ground.visible = true;
    player.visible = true;
    
    if (keyWentDown("right")) {
      ground.velocityX = -3;
      player.velocityX = 3;
    }
    if (keyWentUp("right")) {
      ground.velocityX = 0;
      player.velocityX =0;
    }
    if (keyDown("up")&&player.y>=displayHeight/2+170) {
      player.velocityY=-12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
    
    if (player.x >= displayWidth) {
      player.x = 40;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
     button.hide();
     serveTree.destroy();
     
     if(player.x===400)
     {
     spawnTopGround();
     }
       if (player.isTouching(seedGroup)) {
     console.log("hAppy bday");
         seedGroup.destroyEach();
         seedCount = seedCount + 1;
       }
    if (World.frameCount % 60 == 0) {
      spawnPollution();
    }
    if (player.isTouching(pollutionGroup)&&seedCount>0&&keyDown("space")) {
      pollutionGroup.destroyEach();
      seedCount = seedCount - 1;
    }
    player.collide(topGroundGroup);
    console.log(seedCount);
    console.log(World.frameCount);

  }

  drawSprites();
  if (gameState == "serve") {
    fill(128 + sin(frameCount * 0.1) * 128);
        textSize(40);
  
    textStyle(BOLDITALIC);
  if (mouseIsPressed) {
    stroke(255);
  }
  else {
    noStroke();
  }
  textSize(12 + (mouseX / width)*72);
  text(description, 50, 200);
}

    
    // textSize(20);
    // fill(0);
    // text("Objective: Collect and plant seeds,\n fight the pollution monster\n and make the dry earth green", 600, 570);
    // text("Loading...", 50, displayHeight-50);
  }



function getBackground() {
  if (gameState == "serve") {
    bgImg = "bg1.jpg";
  }
  // else  {
  //   bgImg = "li.jpg";
  // }
  bg = loadImage(bgImg);
}
function changeState() {
  gameState = "play";
}

function keyPressed(){
  if (gameState == "serve" && keyCode === ENTER) {
    gameState == "play";
  }
}

 function spawnTopGround() {
  
    
   
    topGround = createSprite(displayWidth + 110, displayHeight / 2 + 190, 200, 20);
    seed = createSprite(topGround.x, topGround.y - 20, 10, 50);
   seed.shapeColor = "green";
   seed.velocityX = -3;

    topGround.velocityX = -3;
    topGroundGroup.add(topGround);
   seedGroup.add(seed);
   
 }

function spawnPollution() {
  pollution = createSprite(displayWidth + 110, ground.y - 50, 30, 60);
  pollution.velocityX = -3;
  pollution.shapeColor = "brown";
  pollutionGroup.add(pollution);
   }