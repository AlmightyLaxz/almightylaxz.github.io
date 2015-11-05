/***********************************************
					Draw FPS
***********************************************/

var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

function drawFPS(deltaTime) {
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 1220, 20, 100);
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}
}