define([
  'demo',
  'canvasBk',
  'socket',
  'typed'
], function(goOpenSourceUrl, CanvasBk, Socketing, Typing) {
  var App = {
    init: function() {
      goOpenSourceUrl.init();
      CanvasBk.init();
      Socketing.init();
      Typing.init();
    }
  }

  return App;
});
