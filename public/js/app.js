define([
  'demo',
  'canvasBk',
  'typed'
], function(openSource, CanvasBk, Typing) {
  var App = {
    init: function() {
      openSource.init();
      CanvasBk.init();
      Typing;
    }
  }

  return App;
});
