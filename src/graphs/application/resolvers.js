export default {
  Query: {
    application: async (obj, { input }, ctx) => {
      return {
        online: true
      };
    }
  }
};
