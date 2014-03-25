var swap = function(i, min) {

  var j = arr[i];
  arr[i] = arr[min];
  arr[min] = j;

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
    .attr('id', minid)
    ;

  d3.select('.bars').append('rect')
    .attr('class', 'bar')
    .attr('x', ix)
    .attr('width', iwidth)
    .attr('y', miny)
    .attr('height', minheight)
    .attr('id', iid)
    ;
}

function outer(i) {
  if (i < n) {
    updateOuter(i);
    var min = i;
    inner(min, i, i);
  }
}

function inner(min, i, j) {
  if (j < n) {
    updateInner(j, arr[j]);
    if (arr[j] < arr[min]) {
      min = j;
    }
    setTimeout(function() { inner(min, i, ++j); }, 4);
  } else {
    swap(i, min);
    setTimeout(function() { outer(++i); }, 100);
  }
}

outer(0);

