function Chart(element, data) {
  this.array = data;

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

  function Pointer(color, paths) {
    var pointer = svg.append('path')
        .attr('d', paths(0))
        .attr('fill', color);
    this.update = function(i) {
      pointer.attr('d', paths(i));
    }
  }

  this.createHeightPointer = function() {
    return new Pointer('#E74C3C', function(i) { return 'M ' + xPosition(i) + ' ' + yPosition(data[i]) + ' l -16 0 l 8 8 z'; });
  }

  this.createBasePointer = function() {
    return new Pointer('#2C3E50', function(i) { return 'M ' + xModifier(i) + ' ' + outerY + ' l 8 8 l -16 0 z'; });
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

  this.setActive = function(i) {
    d3.selectAll('.bar').classed('min', false);
    d3.select('#bar' + i).classed('min', true);
  }

}

