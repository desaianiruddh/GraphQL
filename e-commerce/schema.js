const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String!
    text: String!
    number: Int!
    price: Float!
    arrayOfStr: [String!]
    arrayOfNum: [String]
    products(filter: ProductFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Reviews!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    updateReview(id: ID!, input: UpdateReviewInput!): Reviews
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
  input AddCategoryInput {
    name: String!
  }
  input AddProductInput {
    image: String!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: ID
  }
  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
  input UpdateCategoryInput {
    name: String!
  }
  input UpdateProductInput {
    name: String
    description: String
    quantity: Int
    image: String
    price: Float
    onSale: Boolean
    categoryId: String
  }
  input UpdateReviewInput {
    date: String
    title: String
    comment: String
    rating: Int
    productId: ID
  }
`;
