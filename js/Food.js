class Food{
    constructor(){}
   
display(){
    fill("Pink");

    var button = createButton("Feed Dog");
    button.position(750,190);
     if(button.mousePressed(function(){
foodS = foodS-1;
gameState = 1;
database.ref('/').update({'gameState':gameState});
     }));
     var addFood = createButton("Add Food");
     addFood.position(550,190)
     if(addFood.mousePressed(function(){
        foodS = foodS+1;
        gameState = 2;
        database.ref('/').update({'gameState':gameState});
             }));
   }
}