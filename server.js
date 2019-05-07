const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ATLAS_URL, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});
