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
    document.querySelector('.selection-filter').addEventListener('input', filterItems, false);

    document.querySelector('input[name="min-area"]').value = min;
    document.querySelector('input[name="max-area"]').value = max;

    document.querySelector('input[name="min"]').value = 1;
    document.querySelector('input[name="min"]').min = min;
    document.querySelector('input[name="min"]').max = max;

    document.querySelector('input[name="max"]').value = max;
    document.querySelector('input[name="max"]').min = min;
    document.querySelector('input[name="max"]').max = max;

    document.querySelector('.range[name="min"]').addEventListener('input', function() {
        document.querySelector('#min-area').value = this.value;
    });

    document.querySelector('.range[name="max"]').addEventListener('input', function() {
        document.querySelector('#max-area').value = this.value;
    });


    document.querySelector('#min-area').addEventListener('keyup', function() {
        document.querySelector('.range[name="min"]').value = this.value;
    });

    document.querySelector('#max-area').addEventListener('keyup', function() {
        document.querySelector('.range[name="max"]').value = this.value;
    });

    document.getElementById('rooms').addEventListener('input', function() {
        let w = this.offsetWidth;
        let count = Number(this.getAttribute('max'));
        let value = this.value;

        let range = (w / count) * value;
        document.querySelector('.bg-after').style.width = `${range}px`;
    });

    document.querySelector('.range[name="min"]').addEventListener('input', function() {
      let width = this.offsetWidth;
      let count = Number(this.getAttribute('max'));
      let range = (width / count) * this.value;

      let test = width - range;


      document.querySelector('.range-slide-bg').style.left = `calc(${test}px)`
    })


    document.querySelector('.range[name="min"]').addEventListener('input', handleChangeFirst);
    document.querySelector('.range[name="max"]').addEventListener('input', handleChangeSecond);

    function handleChangeFirst(e) {
      document.querySelector('.range[name="min').removeAttribute('value');
      let input_value = Number(document.querySelector('.range[name="max').value) - 1;

      if(Number(e.target.value) > input_value) {
        e.target.value = input_value;
        document.querySelector('input[name="min-area"]').value = parseFloat(input_value.toFixed(1));
      }
    }

    function handleChangeSecond(e) {
      document.querySelector('.range[name="max').removeAttribute('value');
      let input_value = Number(document.querySelector('.range[name="min').value) + 1;

      if(Number(e.target.value) < input_value) {
        e.target.value = input_value;
        document.querySelector('input[name="max-area"]').value = parseFloat(input_value.toFixed(1));
      }
    }

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
  if( slide1 > slide2 + 1 ){
      let tmp = slide2; slide2 = slide1; slide1 = tmp;
    } else {

    }
}

export default window.onload = function(){
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