// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { loadFiles } from "@graphql-tools/load-files";
import resolvers from "../../server/graphql";

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const schema = createSchema({
  typeDefs: await loadFiles("src/server/graphql/**/*.graphql"),
  resolvers,
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphiql: {
    // Use WebSockets in GraphiQL
    subscriptionsProtocol: "WS",
  },
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
