function Bird(img, x, y, speed, a){
	this.img = img;
	this.x = x;
	this.y = y;
	this.speed = (speed === 'undefined' ?  0 : speed);
	this.a = (a === 'undefined' ?  0.2 : a);
	this.index = 0; //用于制作小鸟翅膀的动作
}

Bird.prototype.draw = function(ctx){
	this.speed += this.a;
	this.y += this.speed;

	ctx.save();
	ctx.translate(this.x, this.y); //坐标移动到小鸟的中心点
    ctx.rotate(Math.PI/6 * this.speed *0.3); //小鸟的最大旋转角度30度，并随着速度实时改变角度
	ctx.drawImage(this.img, 36*this.index, 0, 36, 26, -36/2, -26/2, 36, 26);
	ctx.restore();
}

var durgather = 0;
Bird.prototype.update = function(dur){
	//每100ms切换一次图片
	durgather += dur;
	if(durgather > 100){
		this.index++;
		if(this.index === 2){
			this.index = 0;
		}
		durgather -= 100;
	}
}