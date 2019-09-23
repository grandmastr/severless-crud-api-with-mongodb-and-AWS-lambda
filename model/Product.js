const mongoose = require('mongoose');

const model = mongoose.model('Product', {
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: Number,
    required: false,
    default: 1
  },
  status: {
    type: Number,
    required: true,
    default: 1
  },
  date: {
    type: Date,
    default: Date().now
  }
});

module.exports = model;
