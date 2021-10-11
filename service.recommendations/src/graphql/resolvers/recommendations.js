module.exports = {
  User: {
    recommendations: (obj, arg, ctx) => {
      return [
        {
          upc: 1,
        },
        {
          upc: 4,
        },
      ];
    },
    reviews: (obj) => {
      return [{ upc: 1, stars: 5 }];
    },
  },
  Review: {
    product: (obj) => {
      console.log("PRODUCT", obj);
      return { upc: obj.upc, __typename: "Product" };
    },
  },
  Product: {
    name: (obj) => {
      console.log("PRODUCT: ", obj);
      return obj.name;
    },
  },
  // Recommendation: {
  //   productSku: (obj) => "555",
  // },
};
