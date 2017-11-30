define([], function() {
  var goOpenSourceUrl = {
    init: function() {
      var path = location.pathname;
      if (path === "/opensources") {
        $('#footer').removeClass('footer').addClass('demo-footer');
        $('.demo-item').on('click', function(e) {
          var url = $(this).attr('data-url');
          window.open(url);
        })
      }
    }
  }
  
  return goOpenSourceUrl;
})
