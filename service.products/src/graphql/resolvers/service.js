const { products } = require("@services/products");

module.exports = {
  Query: {
    serviceName: (obj, arg, ctx) => {
      return process.env.SERVICE_NAME;
    },
  },
};
