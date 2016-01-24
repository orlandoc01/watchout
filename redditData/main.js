
var closureV;
$.get("https://www.reddit.com/.json", function(data) {
  var reddit = data.data.children; //array of reddit stories

  var page = d3.select('body').selectAll('div')
    .data(reddit)
    .enter()
    .append('div')
    .attr('class', 'story')
    .insert('h1')
    .text(function(d){return d.data.author})
    .selectAll('h1')
    .append('p')
    .text(function(d){return Date(d.data.created);})
    .attr('class', 'base');


});

console.log($('h1').text());
