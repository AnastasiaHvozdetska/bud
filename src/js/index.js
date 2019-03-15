document.addEventListener('scroll', fixedMenu);
document.addEventListener('DOMContentLoaded', fixedMenu);

import Leaflet from 'leaflet';

import Triangles from './triangles';
import Slider from './slider';
import Gallery from './gallery';
import Counter from './counter';
import Filter from './filter';



// Fixed menu on scroll.
function fixedMenu () {
  let menu = document.querySelector('header');

  if (window.pageYOffset > 100){
    menu.classList.add('fixed');
  } else {
    menu.classList.remove('fixed');
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
});

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


