function Sky(img, x, y, speed){
	this.img = img;
	this.x = x;
	this.y = y;
	this.speed = speed;
}

Sky.prototype.draw = function(ctx){
	ctx.save();
	ctx.drawImage(this.img, 0, 0, 288,384, this.x, this.y, 800, 600);
	ctx.restore();
}

Sky.prototype.setCount = function(count){
	Sky.count = count;
}

Sky.prototype.update = function(dur){
	this.x -= this.speed * dur;
	if(this.x < -400){
		this.x = Sky.count*400 + this.x;
	}
}