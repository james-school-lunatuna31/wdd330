import { findProductById } from './productData.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

let product = {}

export default async function productDetails(productId) {
  try{
  product = await findProductById(productId);
  if(product === undefined){
    throw new ReferenceError('Product ID not found');
  }
  renderProductDetails(product);
  document.getElementById('addToCart').addEventListener('click', addProductToCart);
  }catch(error){
  if (error instanceof ReferenceError) {
    // I used productName here because it places the text in an appropriate place.
  document.querySelector('#productName').innerHTML += '<p>Invalid product ID. Please check the URL and try again.</p>';
}else{
    throw error; // if something else broke this, we don't want it.
  }
  }
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
