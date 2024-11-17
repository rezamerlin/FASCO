const slides = document.querySelectorAll(".slide");
const maxSlide = slides.length;
let curSlide = 0;

const calcSlider = function (slide) {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${105 * (i - slide)}%)`;
  });
  document
    .querySelectorAll(".img-slider__box")
    .forEach((el) => {
        if(el.querySelector('img').classList.contains('img-slider__active')) el.querySelector('img').classList.remove('img-slider__active');
    } );
  document
    .querySelector(`.slider${slide + 1}`)
    .querySelector("img")
    .classList.add("img-slider__active");
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  calcSlider(curSlide);
};

const prevSlide = function () {
  if (curSlide <= 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  calcSlider(curSlide);
};
calcSlider(0);

const btnRight = document.querySelector(".next");
const btnLeft = document.querySelector(".before");
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);