(function() {
  let resizeReset = function() {
    w = canvasBody.width = window.innerWidth;
    h = canvasBody.height = window.innerHeight;
  }

  const opts = { 
    particleColor: "rgb(233,233,233)",  // 粒子颜色
    lineColor: "rgb(233,233,233)",  // 连接线颜色
    particleAmount: 40,  // 粒子数量
    defaultSpeed: 0.2,  // 基本速度
    variantSpeed: 0.5,  // 随机速度增长量 Math.random() * xx
    defaultRadius: 4,  // 基本半径
    variantRadius: 6,  // 随机半径增长量 Math.random() * xx
    linkRadius: 400,  //连线最大距离
  };

  // 监听窗口变化
  window.addEventListener("resize", function(){
    deBouncer();
  });
  // 鼠标移入加粒子
  // Currentcle = function(x, y) {
  //   this.x = x;
  //   this.y = y;
  //   this.radius = 8;
  //   this.color= 'red';
  //   this.draw = function(ctx) {
  //     ctx.beginPath();
  //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  //     ctx.closePath();
  //     ctx.fillStyle = this.color;
  //     ctx.fill();
  //   }
  // }
  // let currentBall = new Currentcle();
  // window.addEventListener('mousemove', function(e) {
  //   currentBall.x = e.clientX;
  //   currentBall.y = e.clientY;
  // })
  // // 鼠标移出
  // window.addEventListener('mouseout', function(e) {
  //   currentBall.x = -1000;
  //   currentBall.y = -1000;
  // })

  let deBouncer = function() {
      clearTimeout(tid);
      tid = setTimeout(function() {
          resizeReset();
      }, delay);
  };

  let checkDistance = function(x1, y1, x2, y2){ 
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  let linkPoints = function(point1, hubs){ 
    for (let i = 0; i < hubs.length; i++) {
      let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
      let opacity = 1 - distance / opts.linkRadius;
      if (opacity > 0) { 
        drawArea.lineWidth = 0.5;
        drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
        drawArea.beginPath();
        drawArea.moveTo(point1.x, point1.y);
        drawArea.lineTo(hubs[i].x, hubs[i].y);
        drawArea.closePath();
        drawArea.stroke();
      }
    }
  }

  Particle = function(xPos, yPos){ 
    this.x = xPos || Math.random() * w; 
    this.y = yPos || Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
    this.directionAngle = Math.floor(Math.random() * 360); 
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
    this.update = function(){ 
      this.border(); 
      this.x += this.vector.x; 
      this.y += this.vector.y; 
    };
    this.border = function(){ 
      if (this.x >= w || this.x <= 0) { 
        this.vector.x *= -1;
      }
      if (this.y >= h || this.y <= 0) {
        this.vector.y *= -1;
      }
      if (this.x > w) this.x = w;
      if (this.y > h) this.y = h;
      if (this.x < 0) this.x = 0;
      if (this.y < 0) this.y = 0;	
    };
    this.draw = function(){ 
      drawArea.beginPath();
      drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      drawArea.closePath();
      drawArea.fillStyle = this.color;
      drawArea.fill();
    };
  };

  function setup(){ 
    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++){
      particles.push( new Particle() );
    }
    window.requestAnimationFrame(loop);
  }

  function loop(){ 
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0,0,w,h);
    for (let i = 0; i < particles.length; i++){
      particles[i].update();
      particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++){
      linkPoints(particles[i], particles);
    }
    // 鼠标移入加粒子
    // currentBall.draw(drawArea);
    // linkPoints(currentBall, particles);
  }

  const canvasBody = document.getElementById("canvas"),
  drawArea = canvasBody.getContext("2d");
  let delay = 200, tid,
  rgb = opts.lineColor.match(/\d+/g);
  resizeReset();
  setup();
})()
