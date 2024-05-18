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
    quantity: {
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
    deliveryAvailabel: {
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
