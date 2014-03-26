var insertionSort = function(chart) {
  var arr = chart.array;
  return new SortShim(chart, arr, function(shim) {
    function outer(i) {
      if (i < n) {
        chart.updateOuter(i);
        chart.currentMin(i);
        inner(i, i);
      }
    }

    function inner(i, j) {
      if (shim.exit) {
        return;
      }

      if (j > 0 && shim.less(j, j - 1)) {
        shim.exch(j, j - 1);
        chart.updateInner(j - 1, arr[j - 1]);
        chart.currentMin(j - 1);
        setTimeout(function() { inner(i, --j); }, 80);
      } else {
        chart.updateInner(j, arr[j]);
        setTimeout(function() { outer(++i); }, 100);
      }
    }

    outer(1);
  });
}

