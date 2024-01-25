import { findProductById } from './productData.mjs';


export default function productDetails(productId) {

}

export function addProductToCart(product) {

}

export function renderProductDetails() {

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
