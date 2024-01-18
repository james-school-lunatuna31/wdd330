import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
  // get current items that are in the cart.
  let cartItems = getLocalStorage('so-cart');

  //If cart is empty, we may have an issue so we need to create the array
  if (!cartItems){
    cartItems = [];
  }

  // add the item into the cart and then to cart Items as before
  cartItems.push(product);
  setLocalStorage('so-cart', product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
