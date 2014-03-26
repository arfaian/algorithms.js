var selectionSort = function(chart) {
  return new SortShim(chart, function(shim) {
    var innerPointer = chart.createHeightPointer();
    var outerPointer = chart.createBasePointer();

    function outer(i) {
      if (i < n - 1) {
        outerPointer.update(i);
        var min = i;
        chart.setActive(min);
        inner(min, i, i + 1);
      }
    }

    function inner(min, i, j) {
      if (shim.exit) {
        return;
      }

      if (j < n) {
        innerPointer.update(j);
        if (shim.less(j, min)) {
          min = j;
          chart.setActive(min);
        }
        setTimeout(function() { inner(min, i, ++j); }, 80);
      } else {
        shim.exch(i, min);
        innerPointer.update(j - 1);
        setTimeout(function() { outer(++i); }, 100);
      }
    }

    outer(0);
  });
}

