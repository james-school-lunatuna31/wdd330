import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  // old:   const cartItems = getLocalStorage('so-cart');
  /* W2: Your first trello card SOLUTION
  ---------------------------------------
  The above fails because `getLocalStorage` returns a JSON string instead of an array.
  We have to turn it into an array if we want to use the map function when setting html items.
  NOTE: This setup only allows for a single item to be in the cart. Future trello cards may 
  modify this function to allow for multiple items.
  ---------------------------------------
  */
  const cartItems = [];
  cartItems.push(getLocalStorage('so-cart'));
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}


function updateCartTotal() {
  let cartItems = (getLocalStorage('so-cart'))
  if (cartItems) {
    cartItems = [cartItems]; 
  } else {
    cartItems = []; 
  }

  if (cartItems.length > 0) { //checks if cart is empty 
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
    const cartTotalElement = document.querySelector('.cart-total');
    const cartFooterElement = document.querySelector('.cart-footer');
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartFooterElement.classList.remove('hide');
  }
}

document.addEventListener('DOMContentLoaded', updateCartTotal);
renderCartContents();
