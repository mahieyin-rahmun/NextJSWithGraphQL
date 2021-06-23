import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import type { PageConfig } from "next";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "../../../lib/serverless/graphql/resolvers/HelloWorldResolver";
import { UserResolver } from "../../../lib/serverless/graphql/resolvers/UserResolver";
import { prepareConnection } from "../../../lib/utils/db";

// disable next js from handling this route
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  schema: await buildSchema({
    resolvers: [HelloWorldResolver, UserResolver],
  }),
  context: async ({ req, res, connection }) => {
    let databaseConnection = await prepareConnection();
    return {
      req,
      res,
      connection,
      databaseConnection,
    };
  },
});

export default apolloServer.createHandler({ path: "/api/graphql" });
