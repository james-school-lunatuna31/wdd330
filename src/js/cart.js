import { loadCart } from './shoppingCart.mjs';
import { getLocalStorage, loadHeaderFooter, setLocalStorage, updateCartCounter } from './utils.mjs';

init()


async function init(){
  await  loadHeaderFooter();
  await loadCart();
  renderCartContents();
}
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
  updateCartTotal();

  const cartItems = getLocalStorage('so-cart') || [];
  if (cartItems.length) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list');
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelectorAll('.close_icon').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      removeProductFromCart(productId);
      renderCartContents();
    });
  });
  
  }else{
        document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.<p>'
  }

}

function cartItemTemplate(item) {
  // Calculate discounted price
  const discountPercentage = 10; // Assuming a fixed 10% discount
  const discountedPrice = item.FinalPrice * (1 - discountPercentage / 100);

  
  const newItem = `<li class='cart-card divider'>
  <div class='cart-card_interaction'>
  <button class='close_icon' data-id='${item.Id}'> X </button>

  <div class='cart-card__image'>
    <a href='#'>
      <img
        src='${item.Image}'
        alt='${item.Name}'
      />
    </a>
    </div>
  </div>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.quantity}</p>
    <p class='cart-card__price'>$${discountedPrice.toFixed(2)} (Discounted)</p>
</li>`;
  return newItem;
}

// removed outdated price section
// <p class='cart-card__price'>$${item.FinalPrice}</p>

function updateCartTotal() {
  let cartItems = (getLocalStorage('so-cart')) || []
  if (cartItems.length > 0) { //checks if cart is empty
    let total = 0;

  // This is the outdated price of cart, needed to reflect discount
  // cartItems = cartItems.flat(); //cartItems is 2D and it needs to be 1D
  // cartItems.forEach(item => {
  // total += item.FinalPrice * item.quantity;

  // Calculate total based on discounted prices
  cartItems.forEach(item => {
    const discountPercentage = 10; // Assuming a fixed 10% discount
    const discountedPrice = item.FinalPrice * (1 - discountPercentage / 100);
    total += discountedPrice * item.quantity;
  });

    const cartTotalElement = document.querySelector('.cart-total');
    const cartFooterElement = document.querySelector('.cart-footer');
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartFooterElement.classList.remove('hide');
  }else{
    const cartFooterElement = document.querySelector('.cart-footer');
    cartFooterElement.classList.add('hide');
  }
}

function removeProductFromCart(productId) {
  let cartItems = getLocalStorage('so-cart') || [];
  if(cartItems.length){
  const existingProductIndex = cartItems.findIndex(item => item.Id === productId);
   if (existingProductIndex !== -1) {
    if(cartItems[existingProductIndex].quantity > 1){
      cartItems[existingProductIndex].quantity = cartItems[existingProductIndex].quantity - 1;
    }
    else{
      cartItems.splice(existingProductIndex, 1);
     }
    }
  setLocalStorage('so-cart', cartItems);
  updateCartCounter();
}
}

document.addEventListener('DOMContentLoaded', renderCartContents);
