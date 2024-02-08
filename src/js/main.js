import productList from './productList.mjs'
import { updateCartCounter } from './productDetails.mjs';

productList('tents', '.product-list');

document.addEventListener('DOMContentLoaded', updateCartCounter);