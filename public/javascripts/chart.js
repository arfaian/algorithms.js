var drawChart = function(element, data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

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
      .ticks(10);

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
      .text("Value");

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

  var halfRangeBand = x.rangeBand() / 2;
  var xModifier = function(i) { return x(i) + halfRangeBand; };
  var outerY = y(0);

  var outer = svg.append('path')
      .attr('d', function(d) { return 'M ' + xModifier(0) + ' ' + outerY + ' l 8 8 l -16 0 z'; })
      .attr('fill', 'green');

  var inner = svg.append('path')
      .attr('d', function(d) { return 'M ' + xModifier(0) + ' ' + y(0) + ' l 8 8 l -16 0 z'; })
      .attr('fill', 'red');

  updateOuter = function(i) {
    outer.attr('d', function(d) { return 'M ' + xModifier(i) + ' ' + outerY + ' l 6 6 l -12 0 z'; })
  }
  updateInner = function(i, value) {
    var yPosition = y(value) - 6;
    var xPosition = xModifier(i) + halfRangeBand;
    inner.attr('d', function(d) { return 'M ' + xPosition + ' ' + yPosition + ' l -12 0 l 6 6 z'; })
  }
}

