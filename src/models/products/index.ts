import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String
    mark: String
    category: String
    model: String
    price: Int
    avalible: Boolean
    stock: Int
    color: String
    shortDescription: String
    longDescription: String
    weight: Int
    warranty: Boolean
    timeWarranty: Int
    inventory: Boolean
    hidden: Boolean
  }

  type Query {
    AllProducts: [Product]!
    Product(_id: ID!): Product
  }

  type Mutation {
    CreateProduct(
      name: String!
      mark: String!
      category: String!
      model: String
      price: Int!
      avalible: Boolean
      stock: Int!
      color: String
      shortDescription: String!
      longDescription: String
      weight: Int
      warranty: Boolean!
      timeWarranty: Int
      inventory: Boolean
      hidden: Boolean
    ): Product
  }
`;

const resolvers: IResolvers = {
  Query: {
    AllProducts: async (_parent, _args, { Product }) => {
      const products = await Product.find();
      return products.map((el: [any]) => {
        return el;
      });
    },
    Product: async (_parent, args, { Product }) => {
      const { _id } = args;
      const product = await Product.findById(_id);
      return product;
    },
  },
  Mutation: {
    CreateProduct: async (_parent, args, { Product }) => {
      const product = await new Product(args).save();
      return product;
    },
  },
};

export { typeDefs, resolvers };
