//Parameters
var pixSize = 8;

//Other stuff
var ctx;		//The canvas
var maskCtx;	//The grid

function init(){
	ctx = document.getElementById('gradient').getContext('2d', { alpha: false });
	maskCtx = document.getElementById('mask').getContext('2d');

	ctx.canvas.width = 19;
	ctx.canvas.height = 10;

	resize();

	window.requestAnimationFrame(step);
}

function step(){
	var gradient = ctx.createLinearGradient(ctx.canvas.width/2,0,ctx.canvas.width/2,ctx.canvas.height);

	gradient.addColorStop(0, 'hsl(' + (Date.now()/30)%360 + ', 100%, 60%');
	gradient.addColorStop(1, 'white');

	// Set the fill style and draw a rectangle
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	requestAnimationFrame(step);
}

function resize(){

	maskCtx.canvas.style.width == window.innerWidth;
	maskCtx.canvas.width = window.innerWidth;
	maskCtx.canvas.style.height = window.innerHeight;
	maskCtx.canvas.height = window.innerHeight;

	for (let i=0; i<Math.ceil((window.innerWidth)/pixSize); i++){
		for (let j=0; j<Math.ceil((window.innerHeight)/pixSize); j++){
			if ((2*i+3*j)%4!=0){
				maskCtx.fillStyle = 'rgba(0,0,0,1)';
				maskCtx.fillRect(i*pixSize, j*pixSize, pixSize, pixSize);
			}
			else{
				maskCtx.fillStyle = 'rgba(0,0,0,0)';
				maskCtx.fillRect(i*pixSize, j*pixSize, pixSize, pixSize);
			}
		}
	}

	maskCtx.globalCompositeOperation = "destination-out";		//You may think, shouldn't this be in init, you would be right, but it doesn't like that
	maskCtx.fillStyle = "#000";

	maskCtx.roundRect(document.getElementById('window').offsetLeft,	document.getElementById('window').offsetTop,
		document.getElementById('window').offsetWidth,document.getElementById('window').offsetHeight,20).fill();

}

//!! Makes it load slowly. It'll be fine without this

// function toggleColour(){
// 	if (run) {
// 		run = false;
// 		ctx.fillStyle = "#fff";
// 		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// 	}
// 	else{
// 		run = true;
// 		requestAnimationFrame(step);
// 	}
// }

// function toggleGrid(){
// 	if (grid) {
// 		grid = false;
// 		maskCtx.globalCompositeOperation = "destination-out";		//You may think, shouldn't this be in init, you would be right, but it doesn't like that
// 		maskCtx.fillStyle = "#000";
// 		maskCtx.fillRect(0, 0, maskCtx.canvas.width, maskCtx.canvas.height);
// 	}
// 	else{
// 		grid = true;		//Not working?
// 		makegrid();
// 	}
// }


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}