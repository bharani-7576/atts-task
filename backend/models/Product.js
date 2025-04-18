import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
  manufacturingDate: Date,
  image: String
});

export default mongoose.model('Product', productSchema);
