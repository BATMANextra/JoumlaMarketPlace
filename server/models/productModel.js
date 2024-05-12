const mongoose = require('mongoose');
const productShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    age: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    billAvailabel: {
      type: Boolean,
      default: false,
      require: true,
    },
    warrantyAvailabel: {
      type: Boolean,
      default: false,
      require: true,
    },
    accessoriesAvailabel: {
      type: Boolean,
      default: false,
      require: true,
    },
    boxAvailabel: {
      type: Boolean,
      default: false,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('products', productShema);
