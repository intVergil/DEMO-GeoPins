const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/userController")

mongoose
  .connect(process.env.MONGO_ATLAS_URL, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization      
      if(authToken){
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (error) {
      console.log("unable token")
    }
    return { currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});
