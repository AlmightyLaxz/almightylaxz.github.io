/***********************************************
				UI Button Class
***********************************************/

var Button = function(posX, posY, sizeX, sizeY, colour) {
	this.position = new Vector2(posX, posY);
	this.size = new Vector2(sizeX, sizeY);
	//if (colour == undefined) {this.colour = "#000";} else {this.colour = colour;};
}

Button.prototype.mouseOver = function() {
	
}

Button.prototype.onPress = function() {
	console.log("pressed!");
}

Button.prototype.update = function() {
	var mouseResult = mouse.getResults();
	var isMouseDown = mouseResult[0];
	var isMouseOver = intersects(this.position.x, this.position.y, this.size.x, this.size.y, mouseResult[1], mouseResult[2], 1, 1);
	if(isMouseOver) {this.mouseOver();}
	if(isMouseOver && isMouseDown) {this.onPress();}
}

Button.prototype.draw = function() {
	context.fillStyle = this.colour;
	context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
}