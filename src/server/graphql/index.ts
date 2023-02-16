import path from "path";
import { mergeResolvers } from "@graphql-tools/merge";
import User from "./resolvers/user";
import Movies from "./resolvers/imdb";

export default mergeResolvers([User, Movies]);
