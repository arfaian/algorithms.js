var SortShim = function(chart, arr, callback) {
  var self = this;

  this.less = function(v, w) {
    return arr[v] < arr[w];
  }

  this.exch = function(i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
    chart.exchBars(i, j);
    chart.removeMin();
  }

  this.exit = false;

  this.stop = function() { self.exit = true; }

  return { go: function() { callback(self) }, stop: this.stop }
}
