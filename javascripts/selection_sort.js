var selectionSort = function(chart) {
  var arr = chart.array;
  return new SortShim(chart, arr, function(shim) {
    function outer(i) {
      if (i < n - 1) {
        chart.updateOuter(i);
        var min = i;
        chart.currentMin(min);
        inner(min, i, i + 1);
      }
    }

    function inner(min, i, j) {
      if (shim.exit) {
        return;
      }

      if (j < n) {
        chart.updateInner(j, arr[j]);
        if (shim.less(j, min)) {
          min = j;
          chart.currentMin(min);
        }
        setTimeout(function() { inner(min, i, ++j); }, 80);
      } else {
        shim.exch(i, min);
        chart.updateInner(j - 1, arr[j - 1]);
        setTimeout(function() { outer(++i); }, 100);
      }
    }

    outer(0);
  });
}

