var balloon, balloonImage1, balloonImage2;
// create database and position variable here
var database;
var Height;
var topEdge, bottemEdge, leftEdge, rightEdge;

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon1.png",
    "hotairballoon1.png", "hotairballoon2.png", "hotairballoon2.png",
    "hotairballoon2.png", "hotairballoon3.png", "hotairballoon3.png", "hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1200, 600);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/Height');
  balloonHeight.on("value", readHeight, showError);

  topEdge = createSprite(0, 1, 3000, 5);
  bottemEdge = createSprite(0, 700, 3000, 5);
  leftEdge = createSprite(1500, 700, 5, 1500);
  rightEdge = createSprite(1, 300, 5, 1500)

}

// function to display UI
function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2, balloonImage1);
    updateHeight(-10, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updateHeight(10, 0);
  }
  else if (keyDown(UP_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updateHeight(0, -10);
  }
  else if (keyDown(DOWN_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updateHeight(0, 10);
  }

  if (balloon.isTouching(topEdge)) {
    balloon.collide(topEdge);
  }
  if (balloon.isTouching(bottemEdge)) {
    balloon.collide(bottemEdge);
  }
  if (balloon.isTouching(leftEdge)) {
    balloon.collide(leftEdge);
  }
  if (balloon.isTouching(rightEdge)) {
    balloon.collide(rightEdge);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
  

  fill(0);
  stroke("white");
  textSize(25);
  text("By Prithvi",1050,60)
}

function updateHeight(x, y) {
  database.ref('balloon/Height').set({
    'x': Height.x + x,
    'y': Height.y + y
  })
}

function readHeight(data) {
  Height = data.val();
  balloon.x = Height.x;
  balloon.y = Height.y;
}

function showError() {
  console.log("Error in writing to the database");
}
