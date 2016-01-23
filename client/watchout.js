
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
  playObj.x = axes.x(0);
  playObj.y = axes.y(0);
  playObj.angle = 0;
  playObj.velocity = 0;
  return playObj;
};


var drag = d3.behavior.drag()
  //chain stuff
  .on('drag',function(d, i){
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this)
    .attr('x', d.x)
    .attr('y', d.y);
    // attr("transform", function(d,i) {
    //   return "translate(" + [d.x, d.y] + ")";
    // });
  });


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
  var asteroidResults = makeAsteroids(gameOptions.nAsteroids);
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
var rocketInstance = Player();
var rocket = svgContainer.selectAll('image.rocket')
  .data([rocketInstance])
  .enter()
  .append("image")
  .attr('class', 'rocket')
  .attr("xlink:href", "rocket.gif")
  .attr("height", "150px")
  .attr("width", "100px")
  .attr("x", function(d) {
    return d.x ;
  })
  .attr("y", function(d) {
    return d.y;
  })
  .attr("transform", "translate(" + axes.x(50) + "," + axes.y(50) + ")")
  .call(drag);

var checkFunc = function(){
  var asteroids = svgContainer.selectAll('image.asteroid')
    .attr('x');
  console.log(asteroids);
};

//setInterval(checkFunc, 5);

