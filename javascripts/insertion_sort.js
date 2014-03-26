var insertionSort = function(chart) {
  return new SortShim(chart, function(shim) {
    var innerPointer = chart.createHeightPointer();
    var outerPointer = chart.createBasePointer();

    function outer(i) {
      if (i < n) {
        outerPointer.update(i);
        chart.setActive(i);
        inner(i, i);
      }
    }

    function inner(i, j) {
      if (shim.exit) {
        return;
      }

      if (j > 0 && shim.less(j, j - 1)) {
        shim.exch(j, j - 1);
        innerPointer.update(j - 1);
        chart.setActive(j - 1);
        setTimeout(function() { inner(i, --j); }, 80);
      } else {
        innerPointer.update(j);
        setTimeout(function() { outer(++i); }, 100);
      }
    }

    outer(1);
  });
}

