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

// Filter appartments.
let filterItems = document.getElementsByClassName('filter-item');

for(let i = 0; i < filterItems.length; i++) {

  filterItems[i].addEventListener("click", function() {
    console.log(filterItems)

    this.classList.toggle('active');
  })
}






// document.getElementsByClassName('list-item').addEventListener('click', function (e) {
//   console.log(e.target.classList)
//   // if (e.target.classList.contains('list-item')) {
//   //   console.log(this)
//   // }
// })




var initPhotoSwipeFromDOM = function(gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements 
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;

      for(var i = 0; i < numNodes; i++) {

          figureEl = thumbElements[i]; // <figure> element

          // include only element nodes 
          if(figureEl.nodeType !== 1) {
              continue;
          }

          linkEl = figureEl.children[0]; // <a> element

          size = linkEl.getAttribute('data-size').split('x');

          // create slide object
          item = {
              src: linkEl.getAttribute('href'),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
          };



          if(figureEl.children.length > 1) {
              // <figcaption> content
              item.title = figureEl.children[1].innerHTML; 
          }

          if(linkEl.children.length > 0) {
              // <img> thumbnail element, retrieving thumbnail url
              item.msrc = linkEl.children[0].getAttribute('src');
          } 

          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
      }

      return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
      return el && ( fn(el) ? el : closest(el.parentNode, fn) );
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
      });

      if(!clickedListItem) {
          return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
          if(childNodes[i].nodeType !== 1) { 
              continue; 
          }

          if(childNodes[i] === clickedListItem) {
              index = nodeIndex;
              break;
          }
          nodeIndex++;
      }



      if(index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe( index, clickedGallery );
      }
      return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
      params = {};

      if(hash.length < 5) {
          return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
          if(!vars[i]) {
              continue;
          }
          var pair = vars[i].split('=');  
          if(pair.length < 2) {
              continue;
          }           
          params[pair[0]] = pair[1];
      }

      if(params.gid) {
          params.gid = parseInt(params.gid, 10);
      }

      return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {

          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn: function(index) {
              // See Options -> getThumbBoundsFn section of documentation for more info
              var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  rect = thumbnail.getBoundingClientRect(); 

              return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
          }

      };

      // PhotoSwipe opened from URL
      if(fromURL) {
          if(options.galleryPIDs) {
              // parse real index when custom PIDs are used 
              // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
              for(var j = 0; j < items.length; j++) {
                  if(items[j].pid == index) {
                      options.index = j;
                      break;
                  }
              }
          } else {
              // in URL indexes start from 1
              options.index = parseInt(index, 10) - 1;
          }
      } else {
          options.index = parseInt(index, 10);
      }

      // exit if index not found
      if( isNaN(options.index) ) {
          return;
      }

      if(disableAnimation) {
          options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll( gallerySelector );

  for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if(hashData.pid && hashData.gid) {
      openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
  }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');


