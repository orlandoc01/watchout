// start slingin' some d3 here.
var gameOptions = {
  height: '70%',
  width: '100%',
  nAsteroids: 20,
};



var svgContainer = d3.select(".board")
  .append('svg')
  .attr({'width': gameOptions.height, 'height': gameOptions.width});


var asteroidData = [];


svgContainer.append('image')
  .attr({"xlink:href": "asteroid.png",
    "height": "10px",
    "width": "1em"
    });