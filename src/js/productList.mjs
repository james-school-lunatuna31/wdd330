import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(category, selector){
    let data = (await getData(category)).filter(product => product.Id !== '880RT' && product.Id !== '989CG');
    let ele = document.querySelector(selector);
    renderListWithTemplate(productCardTemplate, ele, data);
}

function productCardTemplate(product) {
  // Calculate discounted price, and display the discount
  const discountPercentage = 10; // Assuming a fixed 10% discount
  const discountedPrice = product.FinalPrice * (1 - discountPercentage / 100);  
  
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Image}
        alt=${product.Name}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p>
      <p class="product-card__discount">Seasonal Sale! -${discountPercentage}% OFF (${discountedPrice.toFixed(2)})</p>
      </a
    >
  </li>`;
}
