import { getParam, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

productList(getParam("category"), ".product-list");
loadHeaderFooter();
