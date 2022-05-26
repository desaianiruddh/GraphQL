const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String!
    text: String!
    number: Int!
    price: Float!
    arrayOfStr: [String!]
    arrayOfNum: [String]
    products(filter:ProductFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  type Product {
    id: ID!
    image: String!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Reviews!]!
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
  type Reviews {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
  input ProductFilterInput {
    onSale: Boolean
    avgRating: Int
  }
`;
