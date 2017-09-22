require(['lib/typed.min'], function(Typed) {
  const typed = new Typed('.typed', {
    strings: ["<strong>I'm a web developer.</strong>", "<strong>I'm a designer.</strong>", "<strong>I'm Johnsen.</strong>"],
      typeSpeed: 80,
      backSpeed: 80,
      cursorChar: '|',
      smartBackspace: true, // this is a default
      backDelay: 1000,
      autoInsertCss: true,
      // loop: true
  })
})
