const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

// Initialize an ApolloGateway instance and pass it
// a list of our services.
const gateway = new ApolloGateway({
  serviceList: [
    { name: "recommendations", url: "http://localhost:3366" },
    { name: "products", url: "http://localhost:3355" },
  ],
  debug: true,
});

const server = new ApolloServer({
  gateway,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], // ditch the annoying apollo landing page
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
