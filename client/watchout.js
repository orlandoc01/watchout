
var gameOptions = {
  height: 500,
  width: 750,
  nAsteroids: 1,
  padding: 10,
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
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
  .attr({'width': gameOptions.width, 'height': gameOptions.height});

var asteroidList = [];

var makeAsteroids = function(n){

  asteroidList =  _.range(n).map( function(v) {
    var obj =  { 
        id: v,
        x: axes.x(Math.ceil(Math.random()*90)),
        y: axes.y(Math.ceil(Math.random()*90)),
        height: 50,
        width: 50
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
    .attr('x', (ast) => ast.x - ast.width/2)
    .attr('y', (ast) => ast.y - ast.height/2)
    .tween('custom', function(d) {
      var asteroid = d3.select(this);
      var startx = parseInt(asteroid.attr('x'));
      var starty = parseInt(asteroid.attr('y'));
      var endx = d.x;
      var endy = d.y;
      var asteroidHeight = d.height;
      return function(t) {
        gameStats.currentScore++;
        d3.select('.current span').text(gameStats.currentScore);


        var x = parseFloat(startx + (endx - startx)*t);
        var y = parseFloat(starty + (endy - starty)*t);
        var distance = Math.sqrt(Math.pow((rocketInstance.x - x),2) + Math.pow((rocketInstance.y - y),2));
        if (distance < asteroidHeight){
          console.log("There's been a collision: Do a Barrel Roll!");
        }
        asteroid.attr('x', x);
        asteroid.attr('y', y);
      };
    });
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
    .attr('x', (ast) => ast.x - ast.width/2)
    .attr('y', (ast) => ast.y - ast.height/2)
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


