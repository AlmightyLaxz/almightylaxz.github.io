/***********************************************
				Base State Class
***********************************************/

var GameoverState = function() 
{
	this.prototype = BaseState;
}

GameoverState.prototype.load = function() 
{
	this.restartButton = new Button(473, 649, 400, 100, "#FF0000");
	
	this.restartButton.onPress = function() {
		stateManager.switchState(new SplashState());
		mouse.mouseDown = false;
		uiClickSound.play();
	}
}

GameoverState.prototype.unload = function() 
{
}

GameoverState.prototype.update = function(dt) 
{
	this.restartButton.update();
	this.restartButton.draw();
}

GameoverState.prototype.draw = function() 
{
	context.drawImage(gameover_screen, 0, 0);
}