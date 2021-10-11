class Product {
  constructor(upc, name, price) {
    this.upc = upc;
    this.price = price;
    this.name = name;
  }
}

const products = [
  new Product(1, "Samsung TV", 399),
  new Product(2, "Apple Watch", 199),
  new Product(3, "Sony Stereo", 499),
  new Product(4, "LG Sound Bar", 99),
];

const getProduct = (upc) => {
  if (!upc) return null;
  return products.find((prod) => prod.upc == upc);
};

module.exports = { getProduct, products };
