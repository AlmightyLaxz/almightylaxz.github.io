/***********************************************
				Player Object
***********************************************/

var Player = function() {
	this.sprite = new Sprite("art/Player.png");
	this.sprite.buildAnimation(6, 4, 80, 118, 0.20,
		[0, 1, 2, 3, 4, 5]);
	this.sprite.buildAnimation(6, 4, 80, 118, 0.20,
		[6]);
	this.sprite.buildAnimation(6,4,80,118,0.20,
	[7]);
	this.sprite.buildAnimation(6, 4, 80, 118, 0.20,
		[12, 13, 14, 15, 16, 17]);
	this.sprite.buildAnimation(6, 4, 80, 118, 0.20,
		[18, 19]);

	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -73);
	}
	
	this.position = new Vector2();
	this.position.set(2*TILE, 0*TILE);
	this.width = 140;
	this.height = 163;
	
	this.velocity = new Vector2();
	this.velocity.set(PLAYER_SPEED, 0)

	this.falling = true;
	this.jumping = false;
	this.alive = true;

	this.direction = LEFT;
	
	this.lives = 3;
	
	this.deathTimer = 1.5;
	
	this.armor = 0;
	this.spikeHit = false;
	this.armorDeplete = false;
	
	this.gibbed = false;
};


var LEFT = 0;
var RIGHT = 1;

var ANIM_JUMP_LEFT = 4;
var ANIM_WALK_LEFT = 3;
var ANIM_FALL_RIGHT = 2
var ANIM_JUMP_RIGHT = 1;
var ANIM_WALK_RIGHT = 0;
var ANIM_MAX = 5;

Player.prototype.poweredUp = function() {
	this.armor = 100;
}

Player.prototype.update = function(deltaTime) {
	
	this.sprite.update(deltaTime);
	var jump = false;
	
	var ddx = 0; // acceleration
	var ddy = GRAVITY;
	
	if(this.alive) {
		if(keyboard.isKeyDown(keyboard.KEY_W) == true) {
			jump = true;
			if(this.sprite.currentAnimation != ANIM_JUMP_RIGHT && !this.falling)
				this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		}

		if(keyboard.isKeyDown(keyboard.KEY_A) == true) {
			this.velocity.x = PLAYER_SPEED - 1;
		}
		else {
			this.velocity.x = PLAYER_SPEED;
		}

		if(keyboard.isKeyDown(keyboard.KEY_D) == true) {
			this.velocity.x = PLAYER_SPEED + 1;
		}
		else {
			this.velocity.x = PLAYER_SPEED;
		}
	}
	
	if (jump && !this.jumping && !this.falling)
	{
		ddy = ddy - JUMP; // apply an instantaneous (large) vertical impulse
		this.jumping = true;
		jumpSound.play();
	}
	if(this.velocity.y == 0)
	{
		jump = false;
	}
	
	if(this.jumping == false)
	{
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	
	if(this.velocity.y > 100)
	{
		if(this.sprite.currentAnimation != ANIM_FALL_RIGHT)
			this.sprite.setAnimation(ANIM_FALL_RIGHT);
	}
	
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX;
	this.velocity.y = this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY;
	
	if(player.velocity.y < -1500) {player.velocity.y = -1500;}
	if(player.velocity.y > 1500) {player.velocity.y = 1500;}
	
		var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE; // true if player overlaps right
	var ny = (this.position.y)%TILE; // true if player overlaps below
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	
	// If the player has vertical velocity, then check to see if they have hit a platform
	// below or above, in which case, stop their vertical velocity, and clamp their
	// y position:
	if (this.velocity.y > 0) {
		if ((celldown && !cell) || (celldiag && !cellright && nx)) {
			// clamp the y position to avoid falling into platform below
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0; // stop downward velocity
			this.falling = false; // no longer falling
			this.jumping = false; // (or jumping)
			makeSnowEffect(deltaTime);
			ny = 0; // no longer overlaps the cells below
		}
	}
	else if (this.velocity.y < 0) {
		if ((cell && !celldown) || (cellright && !celldiag && nx)) {
			// clamp the y position to avoid jumping into platform above
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0; // stop upward velocity
			// player is no longer really in that cell, we clamped them to the cell below
			cell = celldown;
			cellright = celldiag; // (ditto)
			ny = 0; // player no longer overlaps the cells below
		}
	}
	if (this.velocity.x > 0) {
		if ((cellright && !cell) || (celldiag && !celldown && ny)) {
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx);
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
	else if (this.velocity.x < 0) {
		if ((cell && !cellright) || (celldown && !celldiag && ny)) {
			// clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx + 1);
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
	
	if(player.position.y > SCREEN_HEIGHT + 50 && player.alive)
	{
		player.lives -= 1;
		player.alive = false;
	}
	
	if(this.alive) {
		if((cellAtTileCoord(LAYER_OBJECT_TRIGGERS, tx, ty) == true) && this.position.x >0 && this.position.y> 0)
		{
			this.spikeHit = true;
			
			if(this.armor == 0)
			{
				player.lives -= 1;
				player.alive = false;
			}
			else {
				this.armorDeplete = true;
				makePowerupEffect();
			}
		}
	}
	if(player.position.x > 6360) { // assuming all levels are same width
		nextLevel();
		player.reset();
	    initialize();
	}
	
	
	if(player.lives == 0)
	{
		this.alive = false;
	}
	
	this.position.x += this.velocity.x;
	
	if(!this.alive) {
		if(this.lives <= 0) {
			this.deathTimer -= deltaTime;
			if(!this.gibbed) {gibSound.play();}
			makeGoreEmitter(deltaTime);
			if(this.deathTimer <= 0) {stateManager.switchState(new GameoverState());}
		}
		else {
			this.deathTimer -= deltaTime;
			if(!this.gibbed) {gibSound.play();}
			makeGoreEmitter(deltaTime);
			if(this.deathTimer <= 0) {player.reset();}
		}
	}
}

Player.prototype.draw = function() {
	if(this.alive) {this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);}
}

Player.prototype.reset = function(resetLives) {
	if(resetLives) {this.lives = 3;}
	this.alive = true;
	this.spikeHit = false;
	this.falling = true;
	this.jumping = false;
	this.position.set(2*TILE, 0*TILE);
	this.deathTimer = 1.5;
	this.gibbed = false;
	if(resetLives) {this.armor = 0;}
	this.armorDeplete = false;
	particles = [];
}