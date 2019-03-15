import Glide from '@glidejs/glide';

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
