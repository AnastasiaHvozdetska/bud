document.addEventListener('scroll', fixedMenu);
document.addEventListener('DOMContentLoaded', fixedMenu);

// Fixed menu on scroll.
function fixedMenu () {
  let menu = document.querySelector('header');

  if (window.pageYOffset > 100){
    menu.classList.add('fixed');
    // Change logo.
    menu.querySelector('.logo a img').setAttribute('src', "./img/partner-logo1.svg");
  } else {
    menu.classList.remove('fixed');
    menu.querySelector('.logo a img').setAttribute('src', "./img/logo.png");
  }
}


// Counter.
// let start = 0,
//     end   = 3200;

// console.log(document.querySelector('#counter').textContent);

// console.log(start, end);

// for (i=0; i <= end; i++) {
//   document.querySelector('#counter').innerHTML = `${i}+`;
// }
let visibleBlock = false;

function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start? 1 : -1;
  let stepTime = Math.round(Math.floor(duration / range));

  let obj = document.getElementById(id);

  let timer = setInterval(function() {
      current += increment;
      obj.innerHTML = `${current}+`;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);

  visibleBlock = true;
}



document.addEventListener('scroll', function () {

  if (window.pageYOffset > 600){
    console.log(visibleBlock)
    if (visibleBlock) {
      animateValue("value", 0, 3456, 100);
    }
  } 
})


if (visibleBlock) {
  animateValue("value", 0, 3456, 100);
  animateValue("value2", 0, 245, 100);
  animateValue("value3", 0, 23, 1000);
  animateValue("value4", 0, 10, 1000); 
} else {
  console.log('afaf')
}

// animateValue("value", 0, 3456, 100);
// animateValue("value4", 0, 10, 1000); 




// Function count number animation.
// var offset = 600;
// // Function start scrolling.
// $(window).scroll(function(){
//     var scrolltop = $(this).scrollTop();
//     $('.achievement').each(function(){
//         if(scrolltop >= $(this).offset().top - offset) {
//             // each to element
//             $('.achievement-item').each(function () {
//                 $(this).find('.achievement-item-number').prop('Counter',0).animate({
//                     Counter: $(this).data('count')
//                     // Counter: $(this).find('.achievement-item-number').text()
//                 }, {
//                     //animation
//                     duration: 2000,
//                     easing: 'swing',
//                     step: function (now) {
//                         $(this).text(Math.ceil(now));
//                     }
//                 });
//             });
//         }
//     });
// });

var options = {
    useEasing: true, 
    useGrouping: true, 
    separator: ',', 
    decimal: '.', 
  };
  var demo = new CountUp('myTargetElement', 0, 5142, 0, 2.5, options);
  if (!demo.error) {
    demo.start();
  } else {
    console.error(demo.error);
  }