define([], function() {
  var goOpenSourceUrl = {
    init: function() {
      $('.demo-item').on('click', function(e) {
        var url = $(this).attr('data-url');
        window.open(url);
      })
    }
  }
  
  return goOpenSourceUrl;
})
