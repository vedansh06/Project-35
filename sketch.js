//Create variables here
var database;
var dog;
var dogImg;
var happyDog;
var foodS;
var foodStock; 
var foodObj;
var lastFed, fedTime;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed Dog");
  feed.position(400,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(300,100);
  addFood.mousePressed(add);

}


function draw() {  
  background(46,139,87);
foodObj.display();
fedTime = database.ref('Time');
fedTime.on("value",function(data){
  lastFed = data.val();
})
if(lastFed >= 12){
  text("Last Feed Time: " + lastFed %12 + "PM",300,30);
}
else if(lastFed == 0){
  text("Last Feed Time: 12 AM",300,30);
}
else{
  text("Last Feed Time: " + lastFed + "AM",300,30);
}
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    Time: hour()
  });
}

function add(){
foodS++;
database.ref('/').update({
  Food: foodS
})
}
