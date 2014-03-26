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

  $(document).on('click', '#selection-sort', function(event) {
    event && event.preventDefault && event.preventDefault();
    prepPage('selection sort', $(this));
    runningAlgorithm = selectionSort(new Chart('#chart', originalArray.slice(0)));
    runningAlgorithm.go();
  });

  $(document).on('click', '#insertion-sort', function(event) {
    event && event.preventDefault && event.preventDefault();
    prepPage('insertion sort', $(this));
    runningAlgorithm = insertionSort(new Chart('#chart', originalArray.slice(0)));
    runningAlgorithm.go();
  });

  $('#selection-sort').trigger('click');
})();
