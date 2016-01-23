function GameClass() {
  this.attributes = {};
  this.attributes.x;
  this.attributes.y; 
  this.attributes.height; 
  this.attributes.width;
  this.angle = 0;
  this.velocity = 0;
};


function Asteroid() {

  GameClass.call(this);
  this.attributes.x = axes.x(Math.floor(Math.random()*101));
  this.attributes.y = axes.y(Math.floor(Math.random()*101));
  this.attributes.height = Math.floor(Math.random()*40 + 10) + 'px';
  this.attributes.width = this.attributes.height;
  this.attributes.href = 'asteroid.png';
  //this.move();
};

Asteroid.prototype = Object.create(GameClass.prototype);
Asteroid.prototype.move = function(){
  //this.cx = //??
  //this.cy = //??
  setTimeout(this.move,1000);
};







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


var asteroidList = _.range(gameOptions.nAsteroids).map( (_) => {return new Asteroid()});

var wtf = svgContainer.selectAll('image').data(asteroidList)
            .enter()
            .append( function(d) {
              var image = document.createElement("IMAGE");
              _.each(d.attributes, function(value, key) {
                image.setAttribute(key, value);
              });
              return image;
            });





var rocket = svgContainer.append('image')
  .attr({"xlink:href": "rocket.gif",
    "height": "100px",
    "width": "100px",
    "x": axes.x(50),
    "y": axes.y(50),
    });