const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const supergraphSdl = readFileSync("./supergraph.graphql").toString();
// Initialize an ApolloGateway instance and pass it
// the supergraph schema
const gateway = new ApolloGateway({
  serviceList: [
    { name: "recommendations", url: "http://localhost:3366" },
    { name: "products", url: "http://localhost:3355/graphql" },
  ],
  debug: true,
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    // winstonLogger(logger),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
