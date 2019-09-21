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
  availableQuantity: {
    type: Number,
    required: false,
    default: 1
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date().now
  }
});

module.exports = model;
