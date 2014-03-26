(function() {
  var runningAlgorithm = null;

  var prepPage = function(header, anchor) {
    if (runningAlgorithm !== null) {
      runningAlgorithm.stop();
    }
    $('#header').text(header);
    $('li.active').toggleClass('active');
    anchor.parent().toggleClass('active');
  }

  var sorts = [
    { id: '#selection-sort', name: 'selection sort', fn: selectionSort },
    { id: '#insertion-sort', name: 'insertion sort', fn: insertionSort },
    { id: '#shell-sort', name: 'shell sort', fn: shellSort }
  ];

  for (var i = 0; i < sorts.length; i++) {
    var sort = sorts[i];
    (function(id, name, fn) {
      $(document).on('click', id, function(event) {
        event && event.preventDefault && event.preventDefault();
        prepPage(name, $(this));
        runningAlgorithm = fn(new Chart('#chart', originalArray.slice(0)));
        runningAlgorithm.go();
      });
    })(sort.id, sort.name, sort.fn)
  }

  $('#selection-sort').trigger('click');
})();
