// start slingin' some d3 here.
var gameOptions = {
  height: '70%',
  width: '100%',
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


var astroid = svgContainer.append('image')
  .attr({"xlink:href": "asteroid.png",
    "height": "100px",
    "width": "100px"
    });

var rocket = svgContainer.append('image')
  .attr({"xlink:href": "rocket.gif",
    "height": "100px",
    "width": "100px"
    });