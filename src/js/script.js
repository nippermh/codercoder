const btnHamburger =  document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
//queryselectorAll allows you to select multiple
const fadeElems = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', function(){
    console.log('The hamburger was clicked');


    if(header.classList.contains('open')){
       body.classList.remove('noscroll');
        header.classList.remove('open');
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
        fadeElems.forEach(function(element){
          element.classList.remove('fade-in');
          element.classList.add('fade-out');
        });


    }
    else {
        body.classList.add('noscroll');
        header.classList.add('open');
        overlay.classList.remove('fade-out');
        overlay.classList.add('fade-in');
        fadeElems.forEach(function(element){
          element.classList.remove('fade-out');
          element.classList.add('fade-in');
        });
    
    
    }
});

