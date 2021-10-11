module.exports = {
  Query: {
    viewer: (obj, arg, ctx) => {
      return { id: 1, name: "Test User" };
    },
  },
};
