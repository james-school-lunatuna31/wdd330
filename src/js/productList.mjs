import { getData } from './productData.mjs';
import { getParam, renderListWithTemplate } from './utils.mjs';
const baseURL = import.meta.env.VITE_SERVER_URL;

export default async function productList(category, selector) {
  let data = (await getData(category)).filter(
    (product) => product.Id !== '880RT' && product.Id !== '989CG'
  );
  let ele = document.querySelector(selector);
  let title = document.querySelector('.title');
  title.innerText = `Top Products: ${category}`
  renderListWithTemplate(productCardTemplate, ele, data);
}

function productCardTemplate(product) {  // Calculate discounted price, and display the discount
  const discountPercentage = 10; // Assuming a fixed 10% discount
  const discountedPrice = product.FinalPrice * (1 - discountPercentage / 100);  
  const baseUrl = window.location.origin;

  return `<li class="product-card">
  <a href="${baseUrl}/product_pages/index.html?product=${product.Id}">
    <img
        src=${product.Images.PrimaryMedium}
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



export async function sortCards() {
  let category = getParam('category')
  let data = (await getData(category)).filter(
      (product) => product.Id !== '880RT' && product.Id !== '989CG');
  let ele = document.querySelector('.product-list');
  let selectBox = document.querySelector('#sort-by');
  if (selectBox.value == 'alpha') {
    data.sort(compare('NameWithoutBrand'));
  }
  else if (selectBox.value == 'price') {
    data.sort(compare('FinalPrice'))
  }
  renderListWithTemplate(productCardTemplate, ele, data);
}

function compare(property) {
   return function(product1, product2) { 
    if (product1[property] < product2[property]) {
    return -1;
   }
   else if (product1[property] > product2[property]) {
    return 1;
   } else { return 0;}
  }
}
