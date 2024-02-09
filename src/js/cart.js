import { loadCart } from './shoppingCart.mjs';
import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';
import { updateCartCounter } from './productDetails.mjs';

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

  const cartItems = getLocalStorage('so-cart') || [];
  if (cartItems.length) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list');
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelectorAll('.close_icon').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      removeProductFromCart(productId);
      updateCartCounter();
      updateCartTotal();
      renderCartContents();
      updateCartCounter();
    });
  });
  
  }else{
        document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.<p>'
  }

}

function cartItemTemplate(item) {
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
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
  return newItem;
}


function updateCartTotal() {
  let cartItems = (getLocalStorage('so-cart')) || []
  if (cartItems.length > 0) { //checks if cart is empty
    let total = 0;

  cartItems = cartItems.flat(); //cartItems is 2D and it needs to be 1D
  cartItems.forEach(item => {
    total += item.FinalPrice * item.quantity;
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
}
}


document.addEventListener('DOMContentLoaded', updateCartTotal);
document.addEventListener('DOMContentLoaded', renderCartContents);
