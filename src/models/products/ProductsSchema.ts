import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  mark: String,
  category: { type: String, index: true },
  subCategory: String,
  model: String,
  price: Number,
  avalible: Boolean,
  stock: Number,
  color: { type: String, index: true },
  shortDescription: String,
  longDescription: String,
  weight: Number,
  warranty: Boolean,
  timeWarranty: Number,
  inventory: Boolean,
  hidden: Boolean,
});

const Product = model('Products', productSchema);

export default Product;
