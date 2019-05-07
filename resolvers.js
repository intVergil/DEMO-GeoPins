const user = {
    _id: "1",
    name: "222",
    email:"333@gmail.com",
    picture: "https://cloud.com/asdad"
};

module.exports = {
  Query: {
    me: () => user
  }
};