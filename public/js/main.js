require.config({
  paths: {
    'zepto': '../lib/zepto.min',
    'typedJS': '../lib/typed.min',
    'vue': '../lib/vue.min',
    'app': 'app'
  }
})
require(['app'], function(App) {
  App.init()
});
