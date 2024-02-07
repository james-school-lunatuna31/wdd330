function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export function getData(category = 'tents') {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  if (products === undefined) {
    throw new Error(`Product with id ${id} not found.`);
  }
  return products.find((item) => item.Id === id);
}
