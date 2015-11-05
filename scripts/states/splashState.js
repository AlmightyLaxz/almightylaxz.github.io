/***********************************************
				Splash Screen State
***********************************************/

var SplashState = function() 
{
	this.prototype = BaseState;
}

SplashState.prototype.load = function() 
{
	this.startButton = new Button(437, 734, 400, 100, "#FF0000");
	
	this.startButton.onPress = function() {
		stateManager.switchState(new GameState());
		mouse.mouseDown = false;
		uiClickSound.play();
	}
}

SplashState.prototype.unload = function() 
{
}

SplashState.prototype.update = function(deltaTime) 
{
	this.startButton.update();
	this.startButton.draw();
}

SplashState.prototype.draw = function() 
{
	context.drawImage(splash_screen, 0, 0)
}