// start slingin' some d3 here.
var gameOptions = {
  height: 500,
  width: 500,
  nAsteroids: 20,
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};




var svgContainer = d3.select(".board")
  .append('svg')
  .attr({'width': gameOptions.height, 'height': gameOptions.width});


var asteroidData = [];


function GameClass(cx, cy) {
  this.cx = cx;
  this.cy = cy; 
  this.angle = 0;
  this.velocity = 0;
}



function Asteroid() {
  GameClass.call(this);
}
Asteroid.prototype = Object.create(GameClass.prototype);

function Player() {
  GameClass.call(this);

}
Player.prototype = Object.create(GameClass.prototype);


var astroid = svgContainer.append('image')
  .attr({"xlink:href": "asteroid.png",
    "height": "100px",
    "width": "100px"
    });

var rocket = svgContainer.append('image')
  .attr({"xlink:href": "rocket.gif",
    "height": "100px",
    "width": "100px",
    "x": axes.x(50) - this.width,
    "y": axes.y(50) - this.height,
    });