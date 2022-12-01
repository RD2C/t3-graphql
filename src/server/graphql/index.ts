import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const resolversArray = loadFilesSync(
  path.join("src", "server", "graphql", "resolvers", "**", "*.ts")
);

export default mergeResolvers(resolversArray);