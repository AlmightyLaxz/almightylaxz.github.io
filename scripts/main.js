/***********************************************
					 LMC Runner
					October 2015
***********************************************/

/***********************************************
					Variables
***********************************************/

// get canvas from HTML document
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var splash_screen = document.createElement("img");
splash_screen.src = "art/splash_screen.png";

var gameover_screen = document.createElement("img");
gameover_screen.src = "art/gameover_screen.png";

var gamewin_screen = document.createElement("img");
gamewin_screen.src = "art/gamewin_screen.png";

var PLAYER_SPEED = 5;

 // abitrary choice for 1m
var METER = 35;
 // very exaggerated gravity (6x) 
var GRAVITY = METER * 9.8 * 6;
 // max horizontal speed (10 tiles per second)
var MAXDX = METER * 10;
 // max vertical speed (15 tiles per second)
var MAXDY = METER * 150;
 // horizontal acceleration - take 1/2 second to reach maxdx
var ACCEL = MAXDX * 4;
 // horizontal friction - take 1/6 second to stop from maxdx
var FRICTION = MAXDX * 10;
 // (a large) instantaneous jump impulse
var JUMP = METER * 1500;

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

var currentLevel = level1;
var levelIndex = 1;
var levelMax = 4;

var LAYER_COUNT = 2;
var LAYER_OBJECT_TRIGGERS = 1;
var LAYER_PLATFORMS = 0;
var LAYER_OBJECT_POWERUPS = 2;



var MAP = {tw:200, th:30};
var TILE = 32;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 0;
var TILESET_SPACING = 4;
var TILESET_COUNT_X = 4;
var TILESET_COUNT_Y = 4;

var tileset = document.createElement("img");
tileset.src = "art/tileset.png";

var mouse = new Mouse();
var keyboard = new Keyboard();

var player = new Player();

var stateManager = new StateManager();
stateManager.pushState(new SplashState());

/***********************************************
				DeltaTime Function
***********************************************/

function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
	// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

/***********************************************
				Initialisation
***********************************************/

var cells = []; // the array that holds our simplified collision data
function initialize() {
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { // initialize the collision map
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < currentLevel.layers[layerIdx].height; y++) {
			cells[layerIdx][y] = [];
			for(var x = 0; x < currentLevel.layers[layerIdx].width; x++) {
				if(currentLevel.layers[layerIdx].data[idx] != 0) {
					// for each tile we find in the layer data, we need to create 4 collisions
					// (because our collision squares are 35x35 but the tile in the
					// level are 70x70)
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1) {
					// if we haven't set this cell's value, then set it to 0 now
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
	
	// add powerups
	idx = 0;
	for(var y = 0; y < currentLevel.layers[LAYER_OBJECT_POWERUPS].height; y++) {
		for(var x = 0; x < currentLevel.layers[LAYER_OBJECT_POWERUPS].width; x++) {
			if(currentLevel.layers[LAYER_OBJECT_POWERUPS].data[idx] != 0) {
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Powerup(px, py);
				powerups.push(e);
			}
			idx++;
		}
	}
}

// initialize trigger layer in collision map
cells[LAYER_OBJECT_TRIGGERS] = [];
idx = 0;
for(var y = 0; y < currentLevel.layers[LAYER_OBJECT_TRIGGERS].height; y++) {
	cells[LAYER_OBJECT_TRIGGERS][y] = [];
	for(var x = 0; x < currentLevel.layers[LAYER_OBJECT_TRIGGERS].width; x++) {
		if(currentLevel.layers[LAYER_OBJECT_TRIGGERS].data[idx] != 0) {
			cells[LAYER_OBJECT_TRIGGERS][y][x] = 1;
			cells[LAYER_OBJECT_TRIGGERS][y-1][x] = 1;
			cells[LAYER_OBJECT_TRIGGERS][y-1][x+1] = 1;
			cells[LAYER_OBJECT_TRIGGERS][y][x+1] = 1;
		}
		else if(cells[LAYER_OBJECT_TRIGGERS][y][x] != 1) {
			// if we haven't set this cell's value, then set it to 0 now
			cells[LAYER_OBJECT_TRIGGERS][y][x] = 0;
		}
		idx++;
	}
}

/***********************************************
				Main (Run) Function
				  Runs at 60 FPS
***********************************************/

function main() {
	var deltaTime = getDeltaTime();
	
	// change the background of the canvas to grey
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	stateManager.update(deltaTime);
	stateManager.draw();
	
	drawFPS(deltaTime);
	
	

}

initialize();


/***********************************************
					Framework
***********************************************/
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(main);