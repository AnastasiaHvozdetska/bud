// Function count number animation.
export default function Inc(obj) {
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

// Inc.
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
    if ( container && document.querySelector('.about-achievements-list').getBoundingClientRect().top < 500) {

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

