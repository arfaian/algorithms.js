function Chart(element, data) {
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

  d3.select(element + " > svg").remove();

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

  var yPosition = function(value) { return y(value) - 8; };
  var xPosition = function(i) { return xModifier(i) + 8; };

  var outer = svg.append('path')
      .attr('d', function(d) { return 'M ' + xModifier(0) + ' ' + outerY + ' l 8 8 l -16 0 z'; })
      .attr('fill', '#2C3E50');

  var inner = svg.append('path')
      .attr('d', function(d) { return 'M ' + xPosition(0) + ' ' + yPosition(d3.select('#bar' + 0).attr('height')) + ' l -16 0 l 8 8 z'; })
      .attr('fill', '#E74C3C');

  this.array = data;

  this.updateOuter = function(i) {
    outer.attr('d', function(d) { return 'M ' + xModifier(i) + ' ' + outerY + ' l 8 8 l -16 0 z'; })
  }

  this.updateInner = function(i, value) {
    inner.attr('d', function(d) { return 'M ' + xPosition(i) + ' ' + yPosition(value) + ' l -16 0 l 8 8 z'; })
  }

  this.exchBars = function(i, min) {
    if (i !== min) {
      var $i = d3.select('#bar' + i);
      var ix = $i.attr('x');
      var iy = $i.attr('y');
      var iid = $i.attr('id');
      var iheight = $i.attr('height');
      var iwidth = $i.attr('width');

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
        .attr('width', iwidth)
        .attr('y', iy)
        .attr('height', iheight)
        .attr('id', minid);

      d3.select('.bars').append('rect')
        .attr('class', 'bar')
        .attr('x', ix)
        .attr('width', iwidth)
        .attr('y', miny)
        .attr('height', minheight)
        .attr('id', iid);
    }
  }

  this.currentMin = (function() {
    var min = null;

    var toggle = function(bool) {
      min.classed('min', bool);
    }

    return function(i) {
      if (min !== null) {
        toggle(false);
      }
      min = d3.select('#bar' + i);
      toggle(true);
    }
  })();

  this.removeMin = function() {
    d3.selectAll('.bar').classed('min', false);
  }
}

