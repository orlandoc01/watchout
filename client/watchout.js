
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

var Player = function() {
  var playObj = {};
  playObj.height = 150;
  playObj.width  = 100;
  playObj.x = axes.x(50);
  playObj.y = axes.y(50);
  playObj.angle = 0;
  playObj.velocity = 0;
  return playObj;
};


var drag = d3.behavior.drag()
  //chain stuff
  .on('drag',function(d, i){
    if ( d.x + d3.event.dx < gameOptions.width - gameOptions.padding && d.x + d3.event.dx > gameOptions.padding){
      d.x += d3.event.dx;
    }
    if (d.y + d3.event.dy < gameOptions.width - gameOptions.padding && d.y + d3.event.dy > gameOptions.padding){
      d.y += d3.event.dy;
    } 
    d3.select(this)
    .attr('x', d.x - d.width/2)
    .attr('y', d.y - d.height/2);
    // attr("transform", function(d,i) {
    //   return "translate(" + [d.x, d.y] + ")";
    // });
  });



var svgContainer = d3.select(".board")
  .append('svg')
  .attr({'width': gameOptions.height, 'height': gameOptions.width});

var asteroidList = [];

var makeAsteroids = function(n){

  asteroidList =  _.range(n).map( function(v) {
    var obj =  { 
        id: v,
        x: axes.x(Math.ceil(Math.random()*100)),
        y: axes.y(Math.ceil(Math.random()*100))
      };
    return obj;
  });
  return asteroidList;
};


var Asteroids = function(){
  var asteroidResults = makeAsteroids(gameOptions.nAsteroids);
  var asteroidMapping = svgContainer.selectAll('image.asteroid')
                        .data(asteroidResults);
  
  //update Asteroid Positions
  asteroidMapping.transition()
    .duration(1000)
    .attr('x', (ast) => ast.x)
    .attr('y', (ast) => ast.y);
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
    .attr('x', (ast) => ast.x)
    .attr('y', (ast) => ast.y)
    .attr("xlink:href", "asteroid.png")
    .attr("class", "asteroid");
  

    //setTimeout(Asteroids, 1000);
};

Asteroids();
var rocketInstance = Player();
var rocket = svgContainer.selectAll('image.rocket')
  .data([rocketInstance])
  .enter()
  .append("image")
  .attr('class', 'rocket')
  .attr("xlink:href", "rocket.gif")
  .attr("height", function(d) {
    return d.height ;
  })
  .attr("width", function(d) {
    return d.width ;
  })
  .attr("x", function(d) {
    return d.x - d.width/2 ;
  })
  .attr("y", function(d) {
    return d.y - d.height/2;
  })
  .call(drag);

var checkFunc = function(){
  var squareDistance = 0;
  var closestAsteroid = asteroidList.reduce( function(prevA, A) {
    DistPrev = Math.pow((rocketInstance.x - prevA.x),2) + Math.pow((rocketInstance.y - prevA.y),2);
    DistA = Math.pow((rocketInstance.x - A.x),2) + Math.pow((rocketInstance.y - A.y),2);
    if(DistA < DistPrev) {
      squareDistance = DistA;
      return A; 
    } else {
      squareDistance = DistPrev;
      return prevA;
    } 
  });

  console.log("Closest Asteroid is has x = " + closestAsteroid.x + " and y = " + closestAsteroid.y);
  console.log("Square is " + squareDistance);
  
};

setInterval(checkFunc, 5000);

