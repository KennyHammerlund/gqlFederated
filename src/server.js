import { importSchema } from "graphql-import";
import { ApolloServer, AuthenticationError } from "apollo-server";
import _ from "lodash";

import * as resolvers from "./graphs/resolvers";

const typeDefs = importSchema("./src/graphs/schema.graphql");

// not required but can be useful if you run multiple servers.
const PORT = process.env.PORT || 2999;

const server = new ApolloServer({
  typeDefs,
  context: req => new Context(req),
  resolvers: _.reduce(resolvers, (prev, next) => _.merge(prev, next)),
  formatError: err => {
    if (err.message.startsWith("Context creation failed: ")) {
      return new AuthenticationError(
        err.message.replace("Context creation failed: ", "")
      );
    }
    return err;
  },
  playground: true
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
