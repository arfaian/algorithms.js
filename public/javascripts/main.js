var drawChart = function(element, data) {
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select(element).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d, i) { return i; }));
  y.domain([0, d3.max(data, function(d) { return d; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  var bars = svg.append("g")
      .attr("class", "bars");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return x(i); })
      .attr("id", function(d, i) { return 'bar' + i; })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d); });
}

var arr = [], n = 100;

for (var i = 0; i < n; i++) {
  arr[i] = i;
}

function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

arr = shuffle(arr);

drawChart('#chart', arr);

var swap = function(i, min) {

  var j = arr[i];
  arr[i] = arr[min];
  arr[min] = j;

  var $i = d3.select('#bar' + i);
  var ix = $i.attr('x');
  var iy = $i.attr('y');
  var iid = $i.attr('id');
  var iheight = $i.attr('height');

  var $min = d3.select('#bar' + min);
  var minx = $min.attr('x');
  var miny = $min.attr('y');
  var minid = $min.attr('id');
  var minheight = $min.attr('height');

  $min.remove();
  $i.remove();

  d3.select('.bars').append('rect')
    .attr('class', 'bar')
    .attr('x', minx)
    .attr('width', 7)
    .attr('y', iy)
    .attr('height', iheight)
    .attr('id', minid)
    ;

  d3.select('.bars').append('rect')
    .attr('class', 'bar')
    .attr('x', ix)
    .attr('width', 7)
    .attr('y', miny)
    .attr('height', minheight)
    .attr('id', iid)
    ;
}

/*
for (var i = 0; i < n; i++) {
  var min = i;
  for (var j = i; j < n; j++) {
    if (arr[j] < arr[min]) {
      min = j;
    }
  }
  swap(i, min);
}
*/

function outer(i) {
  if (i < n) {
    var min = i;
    for (var j = i; j < n; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    swap(i, min);
    setTimeout(function() { outer(i+1); }, 100);
  }
}

outer(0);

console.log(arr);
