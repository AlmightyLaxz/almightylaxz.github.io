/***********************************************
				Vector2 Object
***********************************************/

var Vector2 = function(x, y) {
	if(x == undefined && y == undefined){
		this.x = 0;
		this.y = 0;
	}
	else {
		this.x = x;
		this.y = y;
	}
}

Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
}

Vector2.prototype.add = function(x, y) {
	this.x += x;
	this.y += y;
}

Vector2.prototype.subtract = function(x, y) {
	this.x -= x;
	this.y -= y;
}

Vector2.prototype.multiplyScalar = function(num) {
	this.x = this.x * num;
	this.y = this.y * num;
}

Vector2.prototype.normalize = function(x, y) {
	return Math.sqrt((x * x) + (y * y))
}

Vector2.prototype.copy = function() {
	return this
}

var position = new Vector2();