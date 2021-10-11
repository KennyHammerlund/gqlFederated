module.exports = {
  Query: {
    req_serviceName: (obj, arg, ctx) => {
      return process.env.SERVICE_NAME;
    },
  },
};
