var shellSort = function(chart) {
  return new SortShim(chart, function(shim) {
    var outerPointer = chart.createBasePointer();
    var innerPointer = chart.createHeightPointer();
    var inner2Pointer = chart.createHeightPointer();

    var h = 1;

    while (h < Math.floor(n / 3)) {
      h = 3 * h + 1;
    }

    function outer(h) {
      if (h >= 1) {
        setTimeout((function(i) {
          return function() {
            outerPointer.update(h);
            inner(h, i);
          }
        })(h), 0);
      }
    }

    function inner(h, i) {
      if (i < n) {
        setTimeout(function() {
          inner2(h, i, i);
        }, 80);
      } else {
        outer(Math.floor(h / 3));
      }
    }

    function inner2(h, i, j) {
      if (j >= h && shim.less(j, j - h)) {
        setTimeout(function() {
          shim.exch(j, j - h);
          innerPointer.update(i);
          inner2Pointer.update(j);
          chart.setActive(j);
          inner2(h, i, j - h);
        }, 80);
      } else {
        setTimeout(function() { inner(h, ++i); }, 0);
      }
    }

    outer(h);

  });
}

