document.addEventListener('scroll', fixedMenu);
document.addEventListener('DOMContentLoaded', fixedMenu);

triangleGenerate(document.querySelectorAll('.triangle'));

document.addEventListener('scroll', runCounter);
document.addEventListener('DOMContentLoaded', runCounter);


// Fixed menu on scroll.
function fixedMenu () {
  let menu = document.querySelector('header');
  let url = window.location;

  if (window.pageYOffset > 100){
    menu.classList.add('fixed');
    // Change logo.
    menu.querySelector('.logo a img').setAttribute('src', `img/svg/partner-logo1.svg`);
  } else {
    menu.classList.remove('fixed');
    menu.querySelector('.logo a img').setAttribute('src', `img/logo.png`);
  }
}

// Mobile button.
(function() {
    let dotsMenu = document.querySelector(".dots");
    let menu = document.querySelector('.mobile-nav');
    
    dotsMenu.addEventListener("click", function() {
        menu.classList.toggle('active');
      return dotsMenu.classList.toggle("on");
    });
  
}).call(this);

// Scroll to contacts.
document.querySelector('#contacts').addEventListener('click', function (e) {
    e.preventDefault();
    let contacts = document.querySelector('.contacts');
    contacts.scrollIntoView({block: 'start', behavior: 'smooth'})
});

// Click on mouse icon.
let mouse = document.querySelector('.mouse-icon');

if (mouse) {
    mouse.addEventListener('click', function (e) {
        e.preventDefault();
        let about = document.querySelector('.about-company');
        about.scrollIntoView({block: 'end', behavior: 'smooth'})
    });
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
    perView: 4,
    dots: true
  });

  glide.mount();
}

// Initialisation gallery.
(function() {

    var initPhotoSwipeFromDOM = function(gallerySelector) {

        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                el,
                childElements,
                thumbnailEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {
                el = thumbElements[i];

                // include only element nodes
                if(el.nodeType !== 1) {
                  continue;
                }

                childElements = el.children;

                size = el.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: el.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    author: el.getAttribute('data-author'),
                    title: el.getAttribute('data-title')
                };

                item.el = el; // save link to element for getThumbBoundsFn

                if(childElements.length > 0) {
                  item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                  if(childElements.length > 1) {
                      item.title = childElements[1].innerHTML; // caption (contents of figure)
                  }
                }


                var mediumSrc = el.getAttribute('data-med');
                if(mediumSrc) {
                    size = el.getAttribute('data-med-size').split('x');
                    // "medium-sized" image
                    item.m = {
                        src: mediumSrc,
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                }
                // original image
                item.o = {
                    src: item.src,
                    w: item.w,
                    h: item.h
                };

                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function(el) {
                return el.tagName === 'A';
            });

            if(!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode;

            var childNodes = clickedListItem.parentNode.childNodes,
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
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) { // pid=1
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

                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options->getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.children[0],
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },

                addCaptionHTMLFn: function(item, captionEl, isFake) {
                    if(!item.title) {
                        captionEl.children[0].innerText = '';
                        return false;
                    }
                    captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
                    return true;
                }

            };


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
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }



            var radios = document.getElementsByName('gallery-style');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    if(radios[i].id == 'radio-all-controls') {

                    } else if(radios[i].id == 'radio-minimal-black') {
                        options.mainClass = 'pswp--minimal--dark';
                        options.barsSize = {top:0,bottom:0};
                        options.captionEl = false;
                        options.fullscreenEl = false;
                        options.shareEl = false;
                        options.bgOpacity = 0.85;
                        options.tapToClose = true;
                        options.tapToToggleControls = false;
                    }
                    break;
                }
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

            // see: http://photoswipe.com/documentation/responsive-images.html
            var realViewportWidth,
                useLargeImages = false,
                firstResize = true,
                imageSrcWillChange;

            gallery.listen('beforeResize', function() {

                var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                dpiRatio = Math.min(dpiRatio, 2.5);
                realViewportWidth = gallery.viewportSize.x * dpiRatio;


                if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
                    if(!useLargeImages) {
                        useLargeImages = true;
                        imageSrcWillChange = true;
                    }

                } else {
                    if(useLargeImages) {
                        useLargeImages = false;
                        imageSrcWillChange = true;
                    }
                }

                if(imageSrcWillChange && !firstResize) {
                    gallery.invalidateCurrItems();
                }

                if(firstResize) {
                    firstResize = false;
                }

                imageSrcWillChange = false;

            });

            gallery.listen('gettingData', function(index, item) {
                if( useLargeImages ) {
                    item.src = item.o.src;
                    item.w = item.o.w;
                    item.h = item.o.h;
                } else {
                    item.src = item.m.src;
                    item.w = item.m.w;
                    item.h = item.m.h;
                }
            });

            gallery.init();
        };

        // select all gallery elements
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            console.log(galleryElements[i])
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    initPhotoSwipeFromDOM('.my-gallery');

})();


// Filter apartments.
let activeCategory;

document.addEventListener('click', function(e){
    if (e.target.closest('.filter-item')) {
        let items = e.target.parentNode.nextElementSibling.children;
        let categories = e.target.parentNode.children;

        // Clear rest category.
        for (i = 0; i < categories.length; i++) {
            categories[i].classList.remove('active');
        }
        // Get category.
        e.target.classList.add('active');
        activeCategory = e.target.getAttribute('data-category')

        for (i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
            if (items[i].getAttribute('data-category') === activeCategory) {
                items[i].style.display = 'flex';
            }
            if (activeCategory === 'all') {
                items[i].style.display = 'flex';
            }
        }
    }
})

// Open modal.
document.addEventListener('click', function (e) {
    if (e.target.closest('.apartment-link')) {
        e.preventDefault();
        document.querySelector('body').classList.add('non-scroll');
        document.querySelector('.modal-wrapper').classList.add('active');
    }
});

// Close modal block.
let modalBlock = document.querySelector('.modal-wrapper');
if(modalBlock) {
    document.querySelector('.modal-wrapper').addEventListener('click', function (e) {
        if ( !(e.target.closest('.modal-block')) || e.target.closest('.btn-close')) {
            document.querySelector('body').classList.remove('non-scroll');
            document.querySelector('.modal-wrapper').classList.remove('active');
        }
    });
}


// Get min and max values of area.
let min, max;

function getMinMaxAreas() {
    let array_apartments = document.querySelectorAll('.apartments-item'),
    array_area = [];

    for (let i = 0; i < array_apartments.length; i++) {
        array_area.push( Number( array_apartments[i].getAttribute('data-area') ))
    }

    min = Math.min(...array_area);
    max = Math.max(...array_area);
}

// Selection filter.
let apartmentNum;
let apartmentsArray = document.querySelectorAll('.apartments-item');


let filter = document.querySelector('.selection-filter');

if(filter) {

    getMinMaxAreas();

    document.querySelector('.selection-filter').addEventListener('change', filterItems, false);
    document.querySelector('.selection-filter').addEventListener('keyup', filterItems, false);

    document.querySelector('input[name="min-area"]').value = min;
    document.querySelector('input[name="max-area"]').value = max;

    document.querySelector('input[name="min"]').value = 1;
    document.querySelector('input[name="min"]').min = min;
    document.querySelector('input[name="min"]').max = max;

    document.querySelector('input[name="max"]').value = max;
    document.querySelector('input[name="max"]').min = min;
    document.querySelector('input[name="max"]').max = max;

    document.querySelector('.range[name="min"]').addEventListener('change', function() {
        document.querySelector('#min-area').value = this.value;
    });
      
    document.querySelector('.range[name="max"]').addEventListener('change', function() {
        if (document.querySelector('input[name="max"]').value < document.querySelector('input[name="min"]').value) {
            let max = document.querySelector('input[name="max-area"]').value;
            let min = document.querySelector('input[name="min-area"]').value;
            let tmp = document.querySelector('input[name="min-area"]').value;
            
            // document.querySelector('input[name="min-area"]').value = max;
            // document.querySelector('input[name="max-area"]').value = min
            
        } else {
            document.querySelector('#max-area').value = this.value;
        }
    });
      
    document.querySelector('#min-area').addEventListener('keyup', function() {
        document.querySelector('.range[name="min"]').value = this.value;
    });
      
    document.querySelector('#max-area').addEventListener('keyup', function() {
        document.querySelector('.range[name="max"]').value = this.value;
    });

    document.getElementById('rooms').addEventListener('change', function() {
        let w = this.offsetWidth;
        let count = Number(this.getAttribute('max'));
        let value = this.value;
        
        let range = (w / count) * value
        console.log(range);
        this.style.background = `linear-gradient(to right, #ffce00, #ffce00, #ffce00, ${range}px, #000, #000)`
    })
}

function filterItems() {
    let rooms_count;
    let min_total_area, max_total_area;
    let complex_name;

     let rooms = document.querySelector('#rooms'),
        min_area = document.querySelector('#min-area'),
        max_area = document.querySelector('#max-area'),
        complex = document.querySelector('#complex'),
        array_apartments = document.querySelectorAll('.apartments-item');


        // Set current values.
        rooms_count = rooms.value;
        min_total_area = min_area.value;
        max_total_area = max_area.value;
        complex_name = complex.value;



    for (let i = 0; i < array_apartments.length; i++) {
        let data_area = array_apartments[i].getAttribute('data-area');

        let apartments = rooms_count === '0' ? true : array_apartments[i].getAttribute('data-room') === rooms_count;
        let area = Number(data_area) >= Number(min_total_area) && Number(data_area) <= Number(max_total_area);
        let test = complex_name === 'all' ? true : array_apartments[i].getAttribute('data-complex') === complex_name;

        array_apartments[i].style.backgroundColor = 'white';

        if(apartments && area && test) {
            array_apartments[i].style.backgroundColor = 'red';
        }
    }
}



function getVals(){
  // Get slider values
  let parent = this.parentNode;
  let slides = parent.querySelectorAll(".range");
    let slide1 = parseFloat( slides[0].value );
    let slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ 
      let tmp = slide2; slide2 = slide1; slide1 = tmp;
    }
}

window.onload = function(){
  // Initialize Sliders
  let sliderSections = document.getElementsByClassName("range-slider");
      for( let x = 0; x < sliderSections.length; x++ ){
        let sliders = sliderSections[x].querySelectorAll(".range");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}


