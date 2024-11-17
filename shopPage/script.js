"use strict";

const colors = [
  "#FF6C6C",
  "#FF7629",
  "#FFF06C",
  "#9BFF6C",
  "#6CFF9E",
  "#6CFFDC",
  "#6CB9FF",
  "#6CF6FF",
  "#6CA7FF",
  "#6C7BFF",
  "#8A6CFF",
  "#B66CFF",
  "#FC6CFF",
  "#FF6C6C",
];

const colorsEL = document.querySelectorAll(".color-item");

colorsEL.forEach((el, i) => {
  document.querySelector(`.c${i + 1}`).style.background = colors[i];
});

const productChoose = function (data) {
  console.log(data.src.small);
  const html = `

  <div class="product-choose__img-container">
            <img src="${data.src.large}" alt="">
          </div>
  `;
  console.log("1111111");
  document
    .querySelector(".product-choose")
    .insertAdjacentHTML("afterbegin", html);
  document
    .querySelector(".product-choose__img-container")
    .querySelector("img")
    .addEventListener("load", (e) => {
      console.log("22222222");
      document.querySelector(".product-choose").style.display = "grid";
      timer();
    });
};

const makeProduct = function (data) {
  data.forEach((e) => {
    const html = `
          <div class="Product-card" data-idImg="${e.id}">
               <div class="Product-card__image-container">
                    <div href="">
                         <img src="${e.src.small}" alt="">
                    </div>
               </div>
               <div class="Product-card__info-container">
                   <h3 class="Product-name"><a href="">${e.photographer}</a></h3>
                   <span class="Product-price">$25</span>
               </div>
               <div class="Product-card__color-container">
                   <div class="Product-card__color pc1 Product-color__active" data-color=""><span></span></div>
                   <div class="Product-card__color pc2" data-color=""><span></span></div>
               </div>
          </div>
          `;

    document
      .querySelector(".Products-container")
      .insertAdjacentHTML("beforeend", html);
  });
};

let result;

const picApiById = async function (id) {
  try {
    const API_KEY = "API_KEY";
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const responseJson = await response.json();
    result = responseJson;
    console.log(result.src);
    productChoose(result);
  } catch (err) {
    console.error(err);
  }
};

const picAPI = async function (search, page) {
  try {
    const API_KEY = "API_KEY";
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${search}&orientation=landscape&page=${page}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.json();
    console.log(responseText);
    makeProduct(responseText.photos);
  } catch (err) {
    console.error("error:", err);
  }
};

picAPI("girl", 3);

const allSection = document.querySelectorAll("section");
const calcSectionSlowmation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("anim-sec");
  observer.unobserve(entry.target);
};

const slowmationObserver = new IntersectionObserver(calcSectionSlowmation, {
  root: null,
  threshold: 0.13,
});

allSection.forEach((e) => {
  slowmationObserver.observe(e);
});

////timer

const timer = function () {
  const date3DaysLater = new Date().getTime() + 1 * 14 * 60 * 60 * 1000;
  const countDown = setInterval(() => {
    const now = new Date().getTime();
    const difference = date3DaysLater - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((difference % (1000 * 60)) / 1000);
    document.querySelector(".days").textContent = `${String(days).padStart(
      2,
      0
    )} : `;
    document.querySelector(".hours").textContent = `${String(hours).padStart(
      2,
      0
    )} : `;
    document.querySelector(".minutes").textContent = `${String(mins).padStart(
      2,
      0
    )} : `;
    document.querySelector(".seconds").textContent = `${String(secs).padStart(
      2,
      0
    )}`;
    if (difference < 0) {
      clearInterval(countDown);
    }
  }, 1000);
};

//////////////////////////////

const bagContainer = document.querySelector(".bag-container");
const bagProducts = document.querySelector(".bag-products");
const dashboardCartBtn = document.querySelector(".dashboard-cart");
const overlay = document.querySelector(".overlay");
const closeBagBtn = document.querySelector(".close-bag");

const openBag = function () {
  bagProducts.classList.add("bag-products__active");
  overlay.classList.add("overlay-active");
};
const closeBag = function () {
  bagProducts.classList.remove("bag-products__active");
  overlay.classList.remove("overlay-active");
};

dashboardCartBtn.addEventListener("click", openBag);
closeBagBtn.addEventListener("click", closeBag);
overlay.addEventListener("click", closeBag);

///////////////////////////////////////
const ProductCard = document.querySelector(".Products-container");
ProductCard.addEventListener("click", (e) => {
  const productCard = e.target.closest(".Product-card");
  if (!productCard) return;
  if (productCard) {
    document.querySelector(".shoping-container").style.display = "none";
    const productCardId = productCard.dataset.idimg;
    picApiById(productCardId);
  }
});

/////////////////////////////////////////////

const plus = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");
const quantityCounter = document.querySelectorAll(".quantity-counter");

plus.forEach((e) =>
  e.addEventListener("click", (e) => {
    quantityCounter.forEach((e) => {
      e.textContent = Number(e.textContent) + 1;
    });
  })
);
minus.forEach((e) =>
  e.addEventListener("click", (e) => {
    quantityCounter.forEach((e) => {
      if (Number(e.textContent) === 1) return;
      e.textContent = Number(e.textContent) - 1;
    });
  })
);

///////////////////////////////////////////

let itemsList = [];

const displayBag = function () {
  document.querySelector(".bag-products__items-container").innerHTML = "";
  if (!itemsList) return;
  itemsList.forEach((e) => {
    const html = `
    <div class="bag-item">
                  <div class="bag-item__image-container">
                    <img src="${e.img}" alt="">
                  </div>
                  <div class="bag-item__info-container">
                    <h3 class="bag-item__title">Denim Jacket</h3>
                    <p class="bag-item__color">Color : <span class="bag-item__color-choose">Red</span></p>
                    <span class="bag-item__price">$14.80</span>
                    <div class="bag-item__count">
                      <span class="minus">-</span>
                      <span class="quantity-counter">1</span>
                      <span class="plus">+</span>
                    </div>
                  </div>
                </div>
    `;
    document
      .querySelector(".bag-products__items-container")
      .insertAdjacentHTML("beforeend", html);
  });
};

displayBag();

document.querySelector(".quantity-add_btn").addEventListener("click", () => {
  itemsList.push({
    img: document
      .querySelector(".product-choose__img-container")
      .querySelector("img").src,
  });
  console.log(itemsList);
  displayBag();
});
