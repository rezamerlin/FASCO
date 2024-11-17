import { calcProduct } from "./products.js";

const picAPI = async function (search, page) {
  try {
    const API_KEY = "aQB2VkwlTxbrTJoYJDGj4mDennk9ON0ue8OhnxZNFRJT6HVF8jAKkmYo";

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
    calcProduct(responseText.photos);
  } catch (err) {
    console.error("error:", err);
  }
};

const btnSwitchDesign = function (btnActiveParent, btnActive) {
  btnActiveParent
    .querySelectorAll(".bl-btn")
    .forEach((el) => el.classList.remove("bl-btn"));
  btnActive.classList.add("bl-btn");
};
let page = 2;
let checker = "women’s-fashion";

const categoriesContainer = document.querySelector(".categories");
categoriesContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const clicked = e.target;
  page = 2;
  if (clicked.classList.contains("category-btn")) {
    const seacher = clicked.textContent.replace(" ", "-").toLowerCase();
    btnSwitchDesign(categoriesContainer, clicked);
    if (seacher !== checker) {
      document.querySelector(".products-container").style.opacity = 0;
      document.querySelector(".products-container").innerHTML = "";
      picAPI(seacher, 1);
    }
    checker = seacher;
  }
});

document.querySelector(".more__btn").addEventListener("click", (e) => {
  console.log("aaa");
  e.preventDefault();
  picAPI(checker, page);
  page++;
});
