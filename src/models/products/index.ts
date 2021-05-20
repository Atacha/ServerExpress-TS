import { gql } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';

interface Product {
  _id: String;
  name: String;
  mark: String;
  category: String;
  model: String;
  price: Number;
  avalible: Boolean;
  stock: Number;
  color: String;
  shortDescription: String;
  longDescription: String;
  weight: Number;
  warranty: Boolean;
  timeWarranty: Number;
  inventory: Boolean;
  hidden: Boolean;
}

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

  input ProductInput {
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
    AllProducts(where: ProductInput): [Product]!
    Product(_id: ID!): Product
    FilteredProducts(filter: String): [Product]
  }

  type Mutation {
    CreateProduct(input: ProductInput): Product
    DeleteProduct(_id: ID!): Product
  }
`;

const resolvers: IResolvers = {
  Query: {
    AllProducts: async (_parent, { where }, { Product }) => {
      let products;
      if (where) {
        const { name } = where;
        if (name) {
          products = await Product.find({
            name: { $regex: new RegExp(name), $options: 'i' },
          });
          return products.map((el: Product) => {
            return el;
          });
        }
      }
      products = await Product.find();
      return products.map((el: Product) => {
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
      const { input } = args;
      const product = await new Product(input).save();
      return product;
    },
    DeleteProduct: async (_parent, { _id }, { Product }) => {
      const product = await Product.findById(_id);
      await Product.deleteOne({ _id });
      return product;
    },
    UpdateProduct: async (_parent, args, { Product }) => {
      const { _id, input } = args;
      let product = await Product.findById(_id);
      if (product) {
        await Product.updateOne({ _id }, input);
        product = await Product.findById(_id);
        return product;
      }
      return null;
    },
  },
};

export { typeDefs, resolvers };
