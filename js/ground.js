function Ground(img, x, y, speed){
	this.img = img;
	this.x = x;
	this.y = y;
	this.speed = speed;
}

Ground.prototype.draw = function(ctx){
	ctx.save();
	ctx.drawImage(this.img, 0, 0, 336, 112, this.x, this.y, 336, 112);
	ctx.restore();
}

Ground.prototype.setCount = function(count){
	Ground.count = count;
}

Ground.prototype.update = function(dur){
	this.x -= this.speed * dur;
	if(this.x < -336){
		this.x = Ground.count*336 + this.x;
	}
}