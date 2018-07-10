require.config({
  paths: {
    'zepto': '../lib/zepto.min',
    'typedJS': '../lib/typed.min',
    'app': 'app'
  }
})
require(['app'], function(App) {
  App.init()
});
