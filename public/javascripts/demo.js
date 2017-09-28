(function($) {
  console.log($);
  $('.demo-item').on('click', function(e) {
    var url = $(this).attr('data-url');
    window.open(url);
  })
})($)