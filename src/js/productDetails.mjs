import { findProductById } from './productData.mjs';
import { setLocalStorage } from './utils.mjs';

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
 document.getElementById('addToCart').addEventListener('click', addProductToCart(product));
}

export function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

export function renderProductDetails(product) {
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