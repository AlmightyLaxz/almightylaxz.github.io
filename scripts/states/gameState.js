/***********************************************
					Game State
***********************************************/

var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
	player.reset(true);
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(deltaTime) 
{	
	drawBackground();
	updateParticles(deltaTime);
	player.update(deltaTime);
	drawHUD();
	
	for(var k = 0; k < powerups.length; k++) {
		powerups[k].update(deltaTime);
	}
	
	if(player.armorDeplete == true && player.armor > 0){
		player.armor--;
	}
	
	if(player.armor == 0){
		player.armorDeplete = false;
	}
}

GameState.prototype.draw = function() 
{
	player.draw();
	
	drawMap();
	
	for(var k = 0; k < powerups.length; k++) {
		if(powerups[k].alive == true) {powerups[k].draw();}
		else {powerups.splice(k, 1)}
	}
}