const menuBtns = document.querySelectorAll(".btn-menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".menu");

const menuBtnCalculator = function () {
  openMenuBtn.classList.toggle("active-btn");
  closeMenuBtn.classList.toggle("active-btn");
};

const menuMobileCalculator = function () {
  menuBtnCalculator();
  mobileMenu.classList.toggle("active-menu");
};

menuBtns.forEach((el) => el.addEventListener("click", menuMobileCalculator));
