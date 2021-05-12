import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';

import Product from './models/products/ProductsSchema';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const server = new ApolloServer({
  context: { Product },
  playground: true,
  introspection: true,
  modules: [require('./models/products')],
});

app.use(cors());
app.use(compression());
server.applyMiddleware({ app });

app.listen(PORT, (): void =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
