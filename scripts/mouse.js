/***********************************************
				Mouse Input Class
***********************************************/

var Mouse = function() {
	var self = this;
	window.addEventListener("click", function(evt){self.clicked(evt);}, false);
	window.addEventListener("mousedown", function(evt){self.onDown(evt);}, false);
	window.addEventListener("mouseup", function(evt){self.onUp(evt);}, false);
	this.mouseDown = false;
	this.mouseX = 0;
	this.mouseY = 0;
}

Mouse.prototype.clicked = function(evt) {
	this.mouseX = evt.clientX - canvas.offsetLeft + document.body.scrollLeft;
	this.mouseY = evt.clientY - canvas.offsetTop + document.body.scrollTop;
	
	// Keep in the bounds of the frame
	if(this.mouseX > 0 && this.mouseX <= SCREEN_WIDTH && this.mouseY > 0 && this.mouseY <= SCREEN_HEIGHT) {
		return [true, this.mouseX, this.mouseY];
	}
	else {
		return [false, this.mouseX, this.mouseY];
	}
}

Mouse.prototype.onDown = function(evt) {
	this.mouseDown = true;
	this.mouseX = evt.clientX - canvas.offsetLeft + document.body.scrollLeft;
	this.mouseY = evt.clientY - canvas.offsetTop + document.body.scrollTop;
}

Mouse.prototype.onUp = function(evt) {
	this.mouseDown = false;
	this.mouseX = evt.clientX - canvas.offsetLeft + document.body.scrollLeft;
	this.mouseY = evt.clientY - canvas.offsetTop + document.body.scrollTop;
}

Mouse.prototype.getResults = function() {
	return [this.mouseDown, this.mouseX, this.mouseY];
}