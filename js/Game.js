class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(200, 100);
    car2 = createSprite(400, 100);
    car3 = createSprite(600, 100);
    car4 = createSprite(800, 100);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      // var display_position = 130;
      var index = 0;
      var posx = 0;
      var posy;
      for(var plr in allPlayers){
        index = index + 1;
        posx = posx + 200;
        posy = displayHeight - allPlayers[plr].distance;
        console.log(posy);

        cars[index-1].x = posx;
        cars[index-1].y = posy;
        if(index===player.index){
          cars[index-1].shapeColor = "Red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
    /*    if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        */
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
  
    }
    drawSprites();
  }
  
}
