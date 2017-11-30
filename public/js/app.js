define([
  'demo',
  'canvasBk',
  'socket',
  'typed'
], function(openSource, CanvasBk, Socketing, Typing) {
  var App = {
    init: function() {
      openSource.init();
      CanvasBk.init();
      Socketing.init();
      Typing.init();
    }
  }

  return App;
});
