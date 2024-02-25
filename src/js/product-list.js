import { getParam, loadHeaderFooter } from './utils.mjs';
import productList from './productList.mjs';
import { sortCards } from './productList.mjs';

productList(getParam('category'), '.product-list');
loadHeaderFooter();
document.querySelector('#sort-by').addEventListener('change', sortCards);