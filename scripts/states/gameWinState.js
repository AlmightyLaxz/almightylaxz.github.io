/***********************************************
				Game Win State
***********************************************/

var GameWinState = function() 
{
	this.prototype = BaseState;
}

GameWinState.prototype.load = function() 
{
	this.restartButton = new Button(479, 684, 400, 100, "#FF0000");
	
	this.restartButton.onPress = function() {
		stateManager.switchState(new SplashState());
		mouse.mouseDown = false;
		uiClickSound.play();
	}
}

GameWinState.prototype.unload = function() 
{
}

GameWinState.prototype.update = function(dt) 
{
	this.restartButton.update();
	this.restartButton.draw();
}

GameWinState.prototype.draw = function() 
{
	context.drawImage(gamewin_screen, 0, 0);
}