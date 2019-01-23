document.addEventListener('scroll', fixedMenu);
document.addEventListener('DOMContentLoaded', fixedMenu);

// Fixed menu on scroll.
function fixedMenu () {
  let menu = document.querySelector('header');

  if (window.pageYOffset > 100){
    menu.classList.add('fixed');
    // Change logo.
    menu.querySelector('.logo a img').setAttribute('src', "./img/svg/partner-logo1.svg");
  } else {
    menu.classList.remove('fixed');
    menu.querySelector('.logo a img').setAttribute('src', "./img/logo.png");
  }
}

// Function count number animation.
function Inc(obj) {
  let elem = obj.elem;
  let input = (elem.nodeName.toLowerCase() === 'input') ? true: false;
  let value = parseFloat(elem.getAttribute('data-inc-value')) || 0;
  let duration = parseInt(elem.getAttribute('data-inc-duration')) || 0;
  let delay = parseInt(elem.getAttribute('data-inc-delay')) || 0;
  let decimal = ((obj.decimal > 2) ? 2 : obj.decimal) || 0;
  let currency = obj.currency || '';
  let speed = ((obj.speed < 30) ? 30 : obj.speed) || 30;
  let count = 0;
  let increment = value / (duration / speed);
  let interval = null;
  let regex = /\B(?=(\d{3})+(?!\d))/g;

  let run = function() {
    count += increment;
    if (count < value) {
      (input) ? elem.value = (count).toFixed(decimal).toString().replace(regex, ',') + currency : elem.innerHTML = (count).toFixed(decimal).toString() + currency;
    } else {
      clearInterval(interval);
      (input) ? elem.value = (value).toFixed(decimal).toString().replace(regex, ',') + currency  : elem.innerHTML = (value).toFixed(decimal).toString() + currency;
    }
  };
  setTimeout(function() {
    interval = setInterval(run.bind(this), speed);
  }.bind(this), delay);
  this.reset = function() {
    clearInterval(interval);
    value = parseFloat(elem.getAttribute('data-inc-value')) || 0;
    duration = parseInt(elem.getAttribute('data-inc-duration')) || 0;
    increment = value / (duration / speed);
    delay = parseInt(elem.getAttribute('data-inc-delay')) || 0;
    count = 0;
    interval = setInterval(run, speed);
  }.bind(this);
}

// Inc
let elems = [
  document.querySelector('li.achievements-item:nth-of-type(1) span'),
  document.querySelector('li.achievements-item:nth-of-type(2) span'),
  document.querySelector('li.achievements-item:nth-of-type(3) span'),
  document.querySelector('li.achievements-item:nth-of-type(4) span')


];
let objs = [];
let start = false;

let container = document.querySelector('.about-achievements-list');

function runCounter() {
  if(!start) {
    if ( container && document.querySelector('.about-achievements-list').getBoundingClientRect().top < 400) {

      for (var i = 0, l = elems.length; i < l; i++) {
        objs.push(
          new Inc({
            elem: elems[i],
            speed: 50,
            decimal: 0,
            currency: '+'
          })
        );
      }

      start = true;
    }
  }
}

document.addEventListener('scroll', runCounter);
document.addEventListener('DOMContentLoaded', runCounter);



// Ebani triangles.
function triangleGenerate(array) {

  Array.from(array).forEach(triangle => {
      let width = triangle.offsetWidth,
          height = triangle.offsetHeight;

      if(triangle.classList.contains('bottom-left')) {

        triangle.style.borderWidth = `${height}px 0 0 ${width}px`;

        let cloneTriangle = triangle.cloneNode(true);
        cloneTriangle.style.borderColor = `transparent transparent transparent white`;
        cloneTriangle.style.left = '-4px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('bottom-right')) {

        triangle.style.borderWidth = `0 0 ${height}px ${width}px`;

        let cloneTriangle = triangle.cloneNode(true);
        cloneTriangle.style.borderColor = `transparent transparent white`;
        cloneTriangle.style.right = '-1px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('top-left')) {

        triangle.style.borderWidth = `${height}px ${width}px 0 0 `;
        let cloneTriangle = triangle.cloneNode(true);

        cloneTriangle.style.borderColor = `white transparent transparent`;
        cloneTriangle.style.left = '-1px';
        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);

      } else if(triangle.classList.contains('top-right')) {
        triangle.style.borderWidth = `0 ${width}px  ${height}px 0 `;

        let cloneTriangle = triangle.cloneNode(true);

        cloneTriangle.style.borderColor = `transparent white transparent transparent`;
        cloneTriangle.style.right = '-3px';

        triangle.parentNode.insertBefore(cloneTriangle, triangle.nextSibling);
      }
  })

}

triangleGenerate(document.querySelectorAll('.triangle'));

// Click on mouse icon. (HAVE TO DO)
// document.querySelector('.mouse-icon').addEventListener('click', function(event) {
//   console.log(1);
//   window.scrollTo(0, 400);
// })


// Create button for slider.
(function () {
  let slides = document.querySelectorAll('.glide__slide');

  for (let i = 0; i < slides.length; i++) {
    let button = document.createElement('button');
    button.classList.add('glide__bullet');
    button.setAttribute('data-glide-dir', `=${i}`);

    document.querySelector('.glide__bullets').appendChild(button);
  }
}());

// Initialisation slider.
let slider = document.querySelector('.glide');
if (slider) {
  let glide = new Glide('.glide', {
    type: 'carousel',
    focusAt: '1',
    perView: 4
  });
  
  glide.mount();
}


