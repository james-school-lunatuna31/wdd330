import { loadTemplate, renderWithTemplate } from './utils.mjs';

export async function loadCart(){
  const cartTemplateFn = await loadTemplate('/partials/cart.html')();
  const cart = document.getElementById('cart');
  renderWithTemplate(cartTemplateFn,cart);
}
