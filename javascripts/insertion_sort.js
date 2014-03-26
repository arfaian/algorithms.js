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
      if (j > 0 && shim.less(j, j - 1)) {
        shim.exch(j, j - 1);
        chart.updateInner(j - 1, arr[j - 1]);
        chart.currentMin(j - 1);
        shim.exitWrapper(function() { inner(i, --j); }, 80);
      } else {
        shim.exitWrapper(function() { outer(++i); }, 100);
      }
    }

    outer(1);
  });
}

