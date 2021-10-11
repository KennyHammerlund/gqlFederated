import { importSchema } from "graphql-import";
import { ApolloServer, AuthenticationError } from "apollo-server";
import _ from "lodash";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { buildFederatedSchema } from "@apollo/federation";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" };
    }
  },
  User: {
    __resolveReference(user, { fetchUserById }) {
      return fetchUserById(user.id);
    }
  }
};

// not required but can be useful if you run multiple servers.
const PORT = process.env.PORT || 2999;

const server = new ApolloServer({
  context: req => new Context(req),
  formatError: err => {
    if (err.message.startsWith("Context creation failed: ")) {
      return new AuthenticationError(
        err.message.replace("Context creation failed: ", "")
      );
    }
    return err;
  },
  playground: true,
  // needed as subscriptions are not available through federated. you can subscribe directly to the
  // server that is providing the subscription or in a layer like redis.
  subscriptions: false,
  gateway: new ApolloGateway({
    serviceList: [
      { name: "account", url: "http://localhost:2990/graphql" },
      { name: "blog", url: "http://localhost:2995/graphql" }
    ]
  })
});

// Start accepting connections.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Apollo server running on port ${url}`);
});

class Context {
  constructor(request) {
    const headers = request.req
      ? request.req.headers
      : request.connection.context;
    this.user = headers && headers.user;
    this.request = request.req;

    this.deviceId =
      headers && headers.deviceid && headers.deviceid.replace(/[.\#\$]/g, "-");
  }
}
