var SortShim = function(chart, callback) {
  var self = this;
  var arr = chart.array;

  this.less = function(v, w) {
    return arr[v] < arr[w];
  }

  this.exch = function(i, j) {
    var t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
    chart.exchBars(i, j);
  }

  this.exit = false;

  this.stop = function() { self.exit = true; }

  return { go: function() { callback(self) }, stop: this.stop }
}
