   // 图片资源
	var imgList = [
		{name: "birds", src: "assets/bird.png"},
		{name: "ground", src: "assets/ground.png"},
		{name: "background", src: "assets/bg.png"},
		{name: "tube1", src: "assets/tube1.png"},
		{name: "tube2", src: "assets/tube2.png"}
	];

	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext('2d');

	var W = canvas.width,
		H = canvas.height;

	// 入口函数、
	function load(source, callback){
		var imgEls = {};
		var imgCount = source.length;
		for(var i=0; i < imgCount; i++){
			var name = source[i].name;
			var newImg = new Image();
			newImg.src = source[i].src;
			imgEls[name] = newImg;
			imgEls[name].addEventListener("load", function(){
				imgCount--;
				if(imgCount == 0){
					//加载完毕执行
					 callback(imgEls);
					// console.log("加载完毕");

				}
			}) 
		}
	}



document.body.onload = game;

function game(){
		//图片加载
		load(imgList, function(imgs){ //加载完成后执行回调函数
			console.log(imgs);

			var gameover = false;
			var bounce = -0.5;

			//初始化当前时间
			var preTime = Date.now();

			// 小鸟
			var bird = new Bird(imgs.birds, 100, 300, 0.1, 0.2);
			
			//地面
			var ground1 = new Ground(imgs.ground, 0, 488, 0.2);
			var ground2 = new Ground(imgs.ground, 336, 488, 0.2);
			var ground3 = new Ground(imgs.ground, 336*2, 488, 0.2);
			var ground4 = new Ground(imgs.ground, 336*3, 488, 0.2);

			//天空
			var sky1 = new Sky(imgs.background, 0, 0, 0.2);
			var sky2 = new Sky(imgs.background, 400, 0, 0.2);

			// 管道
			var tube1 = new Pipe(imgs.tube1, imgs.tube2, 250, 0.1);
			var tube2 = new Pipe(imgs.tube1, imgs.tube2, 450, 0.1);
			var tube3 = new Pipe(imgs.tube1, imgs.tube2, 650, 0.1);
			var tube4 = new Pipe(imgs.tube1, imgs.tube2, 850, 0.1);
			var tube5 = new Pipe(imgs.tube1, imgs.tube2, 1000, 0.1);

			//碰撞检测
			function checkCollsion(){
				//与天空和地面的碰撞
				if(bird.y < 26/2 || bird.y > 488 - 26/2){
					gameover = true;
					bird.speed *= bounce;
					canvas.removeEventListener('click', birdFly);
			    }
			    if(bird.y > 488 - 26/2){
			    	bird.y = 488 - 26/2;
			    }

			    //与管道的碰撞
			    gameover = gameover || tube1.hitTest(bird.x, bird.y);
			    gameover = gameover || tube2.hitTest(bird.x, bird.y);
			    gameover = gameover || tube3.hitTest(bird.x, bird.y);
			    gameover = gameover || tube4.hitTest(bird.x, bird.y);
			    gameover = gameover || tube5.hitTest(bird.x, bird.y);
			
			}

	
			function gameloop(){

				if(!gameover){
					window.requestAnimationFrame(gameloop);
				}

				ctx.clearRect(0, 0, W, H);
	
				//计算时间间隔
				var now = Date.now();
				var dt = now - preTime;
				preTime = now;

				//背景绘制
				sky1.update(dt);
				sky1.draw(ctx);
				sky2.update(dt);
				sky2.draw(ctx);
				sky1.setCount(2);

				// 绘制管道
				tube1.update(dt);
				tube1.draw(ctx);
				tube2.update(dt);
				tube2.draw(ctx);
				tube3.update(dt);
				tube3.draw(ctx);
				tube4.update(dt);
				tube4.draw(ctx);
				tube5.update(dt);
				tube5.draw(ctx);
				tube1.setCount(5, 200);

				//绘制陆地
				ground1.update(dt);
				ground1.draw(ctx);
				ground2.update(dt);
				ground2.draw(ctx);
				ground3.update(dt);
				ground3.draw(ctx);
				ground4.update(dt);
				ground4.draw(ctx);
				ground1.setCount(4);

				//绘制小鸟
			    bird.update(dt);
				bird.draw(ctx);

				checkCollsion();
			}
			
			gameloop();

			//小鸟反加速
			function birdFly(){
				bird.speed = -6;
			}

			//监听事件
			canvas.addEventListener('click', birdFly);

		})
	}





	



