import { updateCartCounter } from "./productDetails.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// add pram to the peramaters later?
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(templateFn, parentElement, callback, data, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  //const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, (templateFn));
  if(callback){
    callback(data);
  }
}

export function loadTemplate(path){
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
    const html = await res.text();
    return html;
    }
};
}

export async function loadHeaderFooter(){
  const headerTemplateFn = await loadTemplate('/partials/header.html')();
  const footerTemplateFn = await loadTemplate('/partials/footer.html')();
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  renderWithTemplate(headerTemplateFn,header);
  renderWithTemplate(footerTemplateFn,footer);
  updateCartCounter();
}
