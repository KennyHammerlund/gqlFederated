/**
 * GLOBAL PACKAGES REQUIRED TO BE AT ENTRY POINT
 */
 const path = require("path");

 const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
 const { loadFilesSync } = require("@graphql-tools/load-files");
 const { buildSubgraphSchema } = require("@apollo/subgraph");
 
 const resolversArray = loadFilesSync(
   path.join(__dirname, "/resolvers/**/*.js")
 );
 const typedefArray = loadFilesSync(
   path.join(__dirname, "/typedefs/**/*.graphql")
 );
 
 const schema = buildSubgraphSchema([
   {
     typeDefs: mergeTypeDefs(typedefArray),
     resolvers: mergeResolvers(resolversArray),
   },
 ]);
 
 module.exports = { schema };