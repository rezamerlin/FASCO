


const createProduct = function(data) {
  return new Promise(function(resolve, reject) {
      const html = `
          <a href="" class="products">
              <div class="product-img">
                  <img src="${data}" alt="">
              </div>
              <div class="product-text">
                  <div class="product-header">
                      <div class="product-brand">
                          <h4 class="product-name">Shiny Dress</h4>
                          <span class="product-brand__Name">Al Karam</span>
                      </div>
                      <div class="product-stars">
                          <span class="stars">⭐⭐⭐⭐⭐</span>
                      </div>
                  </div>
                  <div class="product-customers">
                      <span class="customer-reviews">(4.1k) Customer Reviews</span>
                  </div>
                  <div class="product-price__box">
                      <span class="product-price">$95.50</span>
                      <span class="product-price__status">Almost Sold Out</span>
                  </div>
              </div>
          </a>
      `;
      
      document.querySelector('.products-container').insertAdjacentHTML('beforeend', html);
      
      const img = document.querySelector('.products-container').lastElementChild.querySelector('img');
      img.addEventListener('load', resolve);
      img.addEventListener('error', reject); 
  });
}

export const calcProduct = async function(data) {

  const promises = data.slice(0, 12).map(e => createProduct(e.src.medium));
  
 
  await Promise.all(promises);

  document.querySelector('.products-container').style.opacity = 1;
}
