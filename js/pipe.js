function Pipe(upImg, downImg, x, speed){
	this.upImg = upImg;
	this.downImg = downImg;
	this.x = x;
	this.speed = speed;
	this.ranH = Math.random()*200 + 100; //随机高度 + 固定高度 
}

Pipe.prototype.draw = function(ctx){
	ctx.save();
	ctx.drawImage(this.upImg, this.x, this.ranH - 320);
	ctx.drawImage(this.downImg, this.x, this.ranH + 150);
	ctx.restore();
}

Pipe.prototype.setCount = function(count, gap){
	Pipe.count = count;
	Pipe.gap = gap;
}

Pipe.prototype.update = function(dur){
	this.x -= this.speed * dur;
	if(this.x < -52){                    //管道宽52px
		this.x += Pipe.count * Pipe.gap;     //无缝滚动
		this.ranH = Math.random()*200 + 150;    // 切换后重置管道的高度
	}
}

Pipe.prototype.hitTest = function(x, y) {
	return (x+18>this.x && 
			x-18<this.x+52 && 
		    !((y-13)>this.ranH &&
		     (y+13)<this.ranH + 150));
}