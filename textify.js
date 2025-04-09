// get fonts from google fonts api
var fonts = {
    Mandali: {
      weight: 400,
    },
  };
  
  var observers = [];
  // load all fonts
  Object.keys(fonts).forEach(function (family) {
    // creating the needed variables
    var data = fonts[family];
    var obs = new FontFaceObserver(family, data);
    observers.push(obs.load());
  });
  
  // when all fonts are loaded, add class to body
  Promise.all(observers).then(function () {
    document.body.classList.add("fonts-loaded");
    // textify object to create the animation for the text
    new Textify({
        // apply this animation affect to the components with class .textifyTtl
        el: ".textifyTtl",
        // specifics of the animation
        animation: {
          stagger: 0.02,
          duration: 1.5,
          ease: 'expo.inOut',
          animateProps: {"rotate":60,"scale":0,"y":0}
        },
      }, gsap
    );
});


