// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  vendor: String,
  isApproved: Boolean,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
