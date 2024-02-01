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
  const cartItems = []
  cartItems.push(getLocalStorage('so-cart'));
const cartItem = (getLocalStorage('so-cart'));
  if (cartItem) { 
    cartItems.push(cartItem);
  }
    if (cartItems.length) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
  else {
    document.querySelector('.product-list').innerHTML = '<p>You\'re cart is empty.<p>'
  }
  
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

renderCartContents();
