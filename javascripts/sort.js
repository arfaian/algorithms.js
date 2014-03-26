var SortShim = function(chart, arr, callback) {
  this.less = function(v, w) {
    return arr[v] < arr[w];
  }

  this.exch = function(i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
    chart.exchBars(i, j);
  }

  var exit = false;

  this.stop = function() { exit = true; }

  this.exitWrapper = function(cb, time) {
    if (exit) {
      return;
    } else {
      setTimeout(cb, time);
    }
  }

  var self = this;

  return { go: function() { callback(self) }, stop: this.stop }
}
