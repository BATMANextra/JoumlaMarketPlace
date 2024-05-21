const mongoose = require('mongoose');

const requestShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    wilaya: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    business: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('requests', requestShema);

module.exports = Request;
