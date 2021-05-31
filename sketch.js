//Create variables here
var dog,happyDog;
var database,foodS,feed,food;
var readState,gameState;
var feedPet,foodObj,addFood,fedTime,lastFed,feedTime,foodStock;
var bed,bath,garden,Bath,sleep,lr,lrp,gdn;
var milkBottle1,milkBottle2;
function preload(){
	Dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  garden=loadImage("images/Garden.png");
  Bath=loadImage("images/Wash Room.png");
  bed=loadImage("images/Bed Room.png");
  milk2=loadImage("images/milk2.png");
  lr=loadImage("images/Living Room.png")
}

function setup() {
  database = firebase.database();
 createCanvas(750,760); 
  food1 = new Food();

  dog = createSprite(380,350,50,50);
  dog.addImage(Dog);
  dog.scale = 0.15; 

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  milkBottle1 = createSprite(280,700,10,10);
  milkBottle1.addImage(milk2);
  milkBottle1.scale = 0.040;

  milkBottle2 = createSprite(280,365,10,10);
  milkBottle2.addImage(milk2);
  milkBottle2.scale = 0.0902;
  milkBottle2.visible = false;
}


function draw() {  
background("lightBlue");
  
food1.display();
writeStock(foodS);

if(foodS == 0){
  dog.addImage(happyDog);
  milkBottle2.visible = false;
}else{
  dog.addImage(Dog);
  milkBottle2.visible = true;
}

var gameStateRef = database.ref('gameState');
gameStateRef.on('value',function(data){
  gamestate = data.val();
});



 if(gameState === 1){
dog.addImage(happyDog);
dog.scale = 0.165;

 }

 if(gameState === 2){
   dog.addImage(Dog);
   dog.scale = 0.165;
   milkBottle2.visible = false;
  
 }

bath =createButton("I want to bath");
bath.position(580,125);
if(bath.mousePressed(function(){
  gameState = 3;
  database.ref('/').update({'gameState':gameState});
       }));

if(gameState === 3){
  dog.addImage(Bath);
  dog.scale = 1;
  milkBottle2.visible = false;
}

sleep =createButton("I'm sleepy:(");
sleep.position(710,125);
if(sleep.mousePressed(function(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState});
       }));

if(gameState === 4){
  dog.addImage(bed);
  dog.scale = 1;
  milkBottle2.visible = false;
}

lrp =createButton("#Living Room");
lrp.position(450,125);
if(lrp.mousePressed(function(){
  gameState = 5;
  database.ref('/').update({'gameState':gameState});
       }));

if(gameState === 5){
  dog.addImage(lr);
  dog.scale = 1;
  milkBottle2.visible = false;
}

gdn =createButton("Go to Garden:)");
gdn.position(830,125);
if(gdn.mousePressed(function(){
  gameState = 6;
  database.ref('/').update({'gameState':gameState});
       }));

if(gameState === 6){
  dog.addImage(garden);
  dog.scale = 1;
  milkBottle2.visible = false;
}
drawSprites();

textSize(15);
fill("Maroon");
text("Remaining Milk Bottles: "+foodS,300,700);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
   Food:x
  })
}
function getGameState(){
  gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data){
    gamestate = data.val();
  });
}
function updateGameState(){
  database.res('/'.update({
    gameState:gameState
  }))
}