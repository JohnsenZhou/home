require(['lib/typed.min'], function(Typed) {
  const setColor = () => {
    let i = 0;
    setInterval(function() {
      const colorList = [
        '#ffc107', // cheng
        '#607d8b', // hui
        '#4caf50', // lv
        '#00bcd4', // qing
        '#795548', // zon
        '#f44336', // hong
        '#9c27b0', // zi
        '#2196F3', // lan
      ];
      if (i > 7) {
        i = 0
      };
      let color = colorList[i];
      i++;
      $('.sites').css('color', color);
    }, 6000);
  }
  const typed = new Typed('.typed', {
    strings: ["<strong>I'm a web developer.</strong>", "<strong>I'm a designer.</strong>", "<strong>I'm Johnsen Zhou.</strong>"],
      typeSpeed: 80,
      backSpeed: 80,
      cursorChar: '|',
      smartBackspace: true, // this is a default
      backDelay: 1000,
      autoInsertCss: true,
      // loop: true
      onComplete: (self) => {
        $('.sites').addClass('sites-animate');
        setColor();
      }
  })
})
