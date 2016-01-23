
var gameOptions = {
  height: 500,
  width: 750,
  nAsteroids: 5,
  padding: 10,
};

var gameStats = {
  currentScore: 0,
  highScore: 0,
  collisions: 0
};



var Player = function() {
  var playObj = {};
  playObj.height = 150;
  playObj.width  = 100;
  playObj.x = 0.5 * gameOptions.width;
  playObj.y = 0.5 * gameOptions.height;
  playObj.angle = 0;
  playObj.velocity = 0;
  return playObj;
};


var makeAsteroids = function(n){

  asteroidList =  _.range(n).map( function(v) {
    var obj =  { 
        id: v,
        x: (Math.ceil(Math.random()*gameOptions.width*0.9)),
        y: (Math.ceil(Math.random()*gameOptions.height*0.9)),
        height: 50,
        width: 50
      };
    return obj;
  });
  return asteroidList;
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
    diffx = d.x - 0.5*gameOptions.width;
    diffy = d.y - 0.5*gameOptions.height;
    var degrees = parseInt(((Math.atan(diffy/diffy) || 0) + Math.PI/2)*(180/Math.PI)); 
    d3.select(this)      
    .attr('x', d.x - d.width/2)
    .attr('y', d.y - d.height/2)
    .attr('transform', 'rotate(' + degrees + ')'); 
  });



var svgContainer = d3.select(".board")
  .append('svg')
  .attr({'width': gameOptions.width, 'height': gameOptions.height});

var asteroidList = [];




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
      var alreadyCollided = false;
      return function(t) {

        gameStats.currentScore++;
        d3.select('.current span').text(gameStats.currentScore);
        if(gameStats.highScore < gameStats.currentScore) {
          gameStats.highScore = gameStats.currentScore;
          d3.select('.highscore span').text(gameStats.highScore);
        }
        var x = parseFloat(startx + (endx - startx)*t);
        var y = parseFloat(starty + (endy - starty)*t);
        var distance = Math.sqrt(Math.pow((rocketInstance.x - x),2) + Math.pow((rocketInstance.y - y),2));
        if (distance < asteroidHeight && !alreadyCollided){
          gameStats.collisions++;
          gameStats.currentScore = 0;
          d3.select('.collisions span').text(gameStats.collisions);
          alreadyCollided = true;
          console.log("There's been a collision: Do a Barrel Roll!");
        }
        asteroid.attr('x', x);
        asteroid.attr('y', y);
      };
    });

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


