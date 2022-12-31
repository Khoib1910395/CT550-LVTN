const mongoose = require("mongoose");
const ratingSchema = require("./rating"); 

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quality: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
          return value > 0 && value <= 100
      },
      messages: 'Please enter a valid value'
  },
  },
  ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
