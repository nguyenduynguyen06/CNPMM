const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
  },
  platform: {
    type: String,  
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pictures: [
    {
      type: String
    }
  ],
});

const Product  = mongoose.model('Product ', productSchema);  

module.exports = Product ;
