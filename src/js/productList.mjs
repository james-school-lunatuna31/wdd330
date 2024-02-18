import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(category, selector) {
  let data = (await getData(category)).filter(
    (product) => product.Id !== "880RT" && product.Id !== "989CG"
  );
  let ele = document.querySelector(selector);
  renderListWithTemplate(productCardTemplate, ele, data);
}

function productCardTemplate(product) {
  const baseUrl = window.location.origin;
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src=${product.Image}
        alt=${product.Name}
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p></a
    >
  </li>`;
}
