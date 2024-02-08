import { findProductById } from './productData.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

let product = {}

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
 document.getElementById('addToCart').addEventListener('click', () => {addProductToCart(); updateCartCounter();});
}

export function addProductToCart() {
  let cartItems = getLocalStorage('so-cart') || [];
  const existingProductIndex = cartItems.findIndex(item => item.Id === product.Id);
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity = cartItems[existingProductIndex].quantity + 1;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }
  setLocalStorage('so-cart', cartItems);
}

export function renderProductDetails() {
  document.querySelector('#productName').innerText = product.Brand.Name;
  document.querySelector('#productNameWithoutBrand').innerText =
    product.NameWithoutBrand;
  document.querySelector('#productImage').src = product.Image;
  document.querySelector('#productImage').alt = product.Name;
  document.querySelector('#productFinalPrice').innerText = product.FinalPrice;
  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
}

export function updateCartCounter() {
  let cartIcon = document.querySelector('.cart');
  let cart = getLocalStorage('so-cart');
  if (cart !== null) {
    let cartItemsByQty = cart.map(item => {return item.quantity;});
    let cartQty = cartItemsByQty.reduce((currentTotal, currentValue) => {return currentTotal + currentValue;});
    cartIcon.insertAdjacentHTML('afterbegin', `<span class="cart-counter">${cartQty}</span>`);
    cartIcon.querySelector('.cart-counter').innerText = cartQty;
  }
  
}
