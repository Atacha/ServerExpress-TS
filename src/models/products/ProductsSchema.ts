import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  description: String,
  status: String,
  price: Number,
});

const Product = model('Products', productSchema);

export default Product;
