import { getParam } from './utils.mjs';
import productDetails from './productDetails.mjs';
import { updateCartCounter } from './productDetails.mjs';

const productId = getParam('product');
productDetails(productId);

document.addEventListener('DOMContentLoaded', updateCartCounter);
