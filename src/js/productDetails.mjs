import { findProductById } from './productData.mjs';
import { updateCartCounter, getLocalStorage, setLocalStorage } from './utils.mjs';

let product = {}

export default async function productDetails(productId) {
  try{
  product = await findProductById(productId);
  renderProductDetails(product);
 document.getElementById('addToCart').addEventListener('click', () => {addProductToCart(); updateCartCounter();});
  }catch(error){
    renderProductErrorDetails(productId, error.message === `Product with id ${productId} not found.`);
  }
}

function renderProductErrorDetails(productId, unexpected = false){
  // If this were real production, we would want to render an error page. But I think this fits better here for an education env.
  // I am also not a huge fan of canibalizing the ID tags, but if it works it works.
  // The below can tell the difference between a bad product ID and another error. Syntax is <bool> : value if true : value if false
  let errorMessage = unexpected ? '<p>An Unexpected Error has occured.</p>' : '<p>Invalid product ID. Please check the URL and try again.</p>';
  document.querySelector('#productName').innerHTML += errorMessage;
  const backButton = document.createElement('button');
  backButton.style.backgroundColor = '#f06868'; 
  backButton.innerText = 'Back';
  backButton.onclick = () => window.location.href = '/';
  document.querySelector('#productName').appendChild(backButton);
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
  document.querySelector('#addToCart').style.display = 'block';

}
