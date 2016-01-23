function GameClass() {
  this.attributes = {};
  this.attributes.x;
  this.attributes.y; 
  this.attributes.height; 
  this.attributes.width;
  this.angle = 0;
  this.velocity = 0;
};






// var drag = d3.behavior.drag()
//   //chain stuff
//   .on('drag',function(d){
//     h
//   })



// start slingin' some d3 here.
var gameOptions = {
  height: 500,
  width: 500,
  nAsteroids: 20,
  padding: 10,
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};




var svgContainer = d3.select(".board")
  .append('svg')
  .attr({'width': gameOptions.height, 'height': gameOptions.width});


var makeAsteroids = function(n){

  return _.range(n).map( function(v) {
    var obj =  { 
        id: v,
        x: Math.ceil(Math.random()*100),
        y: Math.ceil(Math.random()*100)
      };
    return obj;
  });
};


var Asteroids = function(){
  var asteroidResults = makeAsteroids(20);
  var asteroidMapping = svgContainer.selectAll('image.asteroid')
                        .data(asteroidResults);
  
  //update Asteroid Positions
  asteroidMapping.transition()
    .duration(1000)
    .attr('x', (ast) => axes.x(ast.x))
    .attr('y', (ast) => axes.y(ast.y));
      // .tween('custom', function(t){
      //   var asteroid = d3.select(this);
      //   var startX = asteroid.attr('x');
      //   var startY = asteroid.attr('y');
      //   asteroid.attr('x')
      // });

  //Create new using enter()
  asteroidMapping.enter()
    .append('image')
    .attr('class', 'asteroid')
    .attr('x', (ast) => axes.x(ast.x))
    .attr('y', (ast) => axes.y(ast.y))
    .attr("xlink:href", "asteroid.png")
    .attr("class", "asteroid");
  



  setTimeout(Asteroids, 1000);
};

Asteroids();

var rocket = svgContainer.append('image')
  .attr({"xlink:href": "rocket.gif",
    "height": "100px",
    "width": "100px",
    "x": axes.x(50),
    "y": axes.y(50),
    });