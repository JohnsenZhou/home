define(["typedJS", "zepto", "vue"], function(Typed, $, Vue) {
  console.log('sdfsdfsdfsdf', Vue)
  new Vue({
    el: '#index',
    delimiters: ['${', '}'],
    data: {
      name: 'sdfsf'
    },
    methods: {
      handleColorSet() {
        var i = 0;
        setInterval(function() {
          var colorList = [
            "#ffc107", // cheng
            "#607d8b", // hui
            "#4caf50", // lv
            "#00bcd4", // qing
            "#795548", // zon
            "#f44336", // hong
            "#9c27b0", // zi
            "#2196F3" // lan
          ];
          if (i > 7) {
            i = 0;
          }
          var color = colorList[i];
          i++;
          $(".sites").css("color", color);
        }, 6000);
      },
      handlePageInit() {
        var _self = this
        new Typed(".typed", {
          strings: [
            "<strong>I'm a web developer.</strong>",
            "<strong>I'm a designer.</strong>",
            "<strong>I'm Johnsen Zhou.</strong>"
          ],
          typeSpeed: 80,
          backSpeed: 80,
          cursorChar: "|",
          smartBackspace: true, // this is a default
          backDelay: 1000,
          autoInsertCss: true,
          // loop: true
          onComplete: function() {
            $(".sites").addClass("sites-animate");
            $(".footer").addClass("footer-animate");
            _self.handleColorSet();
          }
        });
      }
    },
    mounted() {
      this.handlePageInit()
      console.log('sdfsdf')
    },
  })
  // var setColor = function() {
  //   var i = 0;
  //   setInterval(function() {
  //     var colorList = [
  //       "#ffc107", // cheng
  //       "#607d8b", // hui
  //       "#4caf50", // lv
  //       "#00bcd4", // qing
  //       "#795548", // zon
  //       "#f44336", // hong
  //       "#9c27b0", // zi
  //       "#2196F3" // lan
  //     ];
  //     if (i > 7) {
  //       i = 0;
  //     }
  //     var color = colorList[i];
  //     i++;
  //     $(".sites").css("color", color);
  //   }, 6000);
  // };
  // var Typing = {
  //   init: function() {
  //     var path = location.pathname;
  //     if (path === "/") {
  //       new Typed(".typed", {
  //         strings: [
  //           "<strong>I'm a web developer.</strong>",
  //           "<strong>I'm a designer.</strong>",
  //           "<strong>I'm Johnsen Zhou.</strong>"
  //         ],
  //         typeSpeed: 80,
  //         backSpeed: 80,
  //         cursorChar: "|",
  //         smartBackspace: true, // this is a default
  //         backDelay: 1000,
  //         autoInsertCss: true,
  //         // loop: true
  //         onComplete: function() {
  //           $(".sites").addClass("sites-animate");
  //           $(".footer").addClass("footer-animate");
  //           setColor();
  //         }
  //       });
  //     }
  //   }
  // } 
});
