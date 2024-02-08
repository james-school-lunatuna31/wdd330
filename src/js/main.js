import productList from './productList.mjs'
import { updateCartCounter } from './productDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

productList('tents', '.product-list');
loadHeaderFooter();


document.addEventListener('DOMContentLoaded', updateCartCounter);