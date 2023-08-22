
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
canvas.width = 728;
canvas.height = 410;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.jpg";

    // // Hero image
    // var heroReady = false;
    // var heroImage = new Image();
    // heroImage.onload = function () {
    //     heroReady = true;
    // };
    // heroImage.src = "goblin-1.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "slime-1.png";



// Game objects

var monster = {};
var monstersCaught = 0;
var speed=2000;
// Handle keyboard controls
var mouseClick = {};
var d=new Date();

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.resetDelay = function(newT) {
        t = newT;
        return this.stop().start();
    }
}
var startTime=Date.now();

// Reset the game when the player catches a monster
var reset =new Timer(function () {
	// Throw the monster somewhere on the screen randomly
	monster.x = 32+ (Math.random() * (canvas.width - 64));
	monster.y = 32+ (Math.random() * (canvas.height - 64));
	console.log("speed : "+speed);
	console.log(((Date.now()-startTime)/1000).toFixed(3)+"location changed");
},speed);
// Click Function
addEventListener("click",function(e){
	const rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left-32
    var y = event.clientY - rect.top-32
    console.log("click x:"+ event.clientX+", clcick Y:"+ event.clientY);
    console.log("monster x:"+ monster.x + ", monster Y:"+monster.y);
    console.log("click x:"+ x+", clcick Y:"+ y);
	
    //Is monster clicked?
   if(  x<= (monster.x +32)
        && monster.x <= (x +32)
        && y <= (monster.y +32)
        && monster.y <= (y+32) )
    {
        ++monstersCaught;
		if(speed>100){
			speed-=100;
		}

        // setInterval(reset,speed);
		reset.resetDelay(speed);
		
    } 
	//original ver 
//    if(event.clientX  <= (monster.x +32)
//         && monster.x <= (event.clientX +32)
//         && event.clientY <= (monster.y +32)
//         && monster.y <= (event.clientY+32) )
//     {
//         ++monstersCaught;
//         reset();
//     }  
        
    
},false);

var resetScore=document.getElementById("resetScore");
resetScore.addEventListener("click",function(e){
	monstersCaught=0;
	// speed=3000;
	// setTimeout(reset,speed);
});

var resetSpeed=document.getElementById("resetSpeed");
resetSpeed.addEventListener("click",function(e){
	// clearInterval(delay);
	// delay=null;
	// speed=3000000;
	speed=2000;
	// delay=setInterval(reset,speed);
	reset.resetDelay(speed);
});

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	//var now = Date.now();
	//var delta = now - then;

	//update(delta / 1000);
	render();

	//then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
// var delay=setInterval(reset,speed);
reset.start();
console.log(speed);
main();