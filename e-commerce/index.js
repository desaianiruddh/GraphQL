const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');

const { Query } = require('./resolvers/Query');
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { db } = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  },
  context: db,
});
server.listen().then(({ url }) => {
  console.log('server is ready at', url);
});
