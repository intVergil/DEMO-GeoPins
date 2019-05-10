const { AuthenticationError } = require("apollo-server");

const user = {
  _id: "1",
  name: "222",
  email: "333@gmail.com",
  picture: "https://cloud.com/asdad"
};

const authenticated = next => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser)
  }
};
