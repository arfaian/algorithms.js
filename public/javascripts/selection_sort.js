var swap = function(i, min) {
  var j = arr[i];
  arr[i] = arr[min];
  arr[min] = j;
  swapBars(i, min);
}

function outer(i) {
  if (i < n - 1) {
    updateOuter(i);
    var min = i;
    currentMin(min);
    inner(min, i, i + 1);
  }
}

function inner(min, i, j) {
  if (j < n) {
    updateInner(j, arr[j]);
    if (arr[j] < arr[min]) {
      min = j;
      currentMin(min);
    }
    setTimeout(function() { inner(min, i, ++j); }, 80);
  } else {
    swap(i, min);
    setTimeout(function() { outer(++i); }, 100);
  }
}

outer(0);

