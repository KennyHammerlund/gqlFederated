const { products, getProduct } = require("@services/products");

module.exports = {
  Query: {
    products: (obj, arg, ctx) => {
      return products;
    },
  },
  Product: {
    __resolveReference(reference) {
      return getProduct(reference.upc);
    },
  },
};
