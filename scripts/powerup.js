/***********************************************
				Powerup Class
***********************************************/

var powerups = [];

var Powerup = function(x, y) {
	this.sprite = new Sprite("art/speed.png");
	this.sprite.buildAnimation(2, 1, 60, 60, 0.3, [0]);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.width = 60;
	this.height = 60;
		
	this.alive = true;
}

Powerup.prototype.update = function(deltaTime) {
	this.sprite.update(deltaTime);
	
	var screenXPowerup = this.position.x - worldOffsetX;
	var screenXPlayer = player.position.x - worldOffsetX;
	var pickedUp = intersects(screenXPowerup, this.position.y, TILE, TILE, screenXPlayer, player.position.y, TILE, TILE);
	if(pickedUp) {
		player.poweredUp();
		makePowerupEffect();
		powerupSound.play();
		this.alive = false;
	}
}

Powerup.prototype.draw = function() {
		var screenX = this.position.x - worldOffsetX;
		this.sprite.draw(context, screenX, this.position.y - 25);
}