const slidesT = document.querySelectorAll('.testimonials-slide');
let currentSlide = 0; 

const nextBtn = document.querySelector('.testimonials-btn:nth-child(2)');
const prevBtn = document.querySelector('.testimonials-btn:nth-child(1)');

function updateSlides() {
  slidesT.forEach((slide, i) => {
    let translateX = 0;

    if (i === currentSlide) {
      translateX = 0; 
    } else if (i === (currentSlide + 1) % slidesT.length) {
      translateX = 40;
    } else {
      translateX = -40;
    }

   
    slide.style.transform = `translateX(${translateX}%)`;

  
    if (i === currentSlide) {
      slide.classList.add('testimonials-slide__active');
      slide.style.transform += ' scale(1)'; 
    } else {
      slide.classList.remove('testimonials-slide__active');
      slide.style.transform += ' scale(0.7)'; 
    }
  });
}


prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slidesT.length; 
  updateSlides();
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slidesT.length) % slidesT.length; 
  updateSlides();
});

updateSlides();