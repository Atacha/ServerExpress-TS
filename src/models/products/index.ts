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
    FilteredProducts(filter: String): [Product]
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

    DeleteProduct(_id: ID!): Product

    UpdateProduct(
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
    FilteredProducts: async (_parent, { filter }, { Product }) => {
      const query = JSON.parse(filter);
      const products = await Product.find(query);
      return products.map((el: [any]) => {
        return el;
      });
    },
  },
  Mutation: {
    CreateProduct: async (_parent, args, { Product }) => {
      const product = await new Product(args).save();
      return product;
    },
    DeleteProduct: async (_parent, args, { Product }) => {
      const { _id } = args;
      const product = await Product.findById(_id);
      await Product.deleteOne({ _id });
      return product;
    },
    UpdateProduct: async (_parent, args, { Product }) => {
      const { _id } = args;
      let product = await Product.findById(_id);
      if (product) {
        delete args._id;
        await Product.updateOne({ _id }, args);
        product = await Product.findById(_id);
        return product;
      }
      return null;
    },
  },
};

export { typeDefs, resolvers };
