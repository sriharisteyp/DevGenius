const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly', 'forever'],
    default: 'monthly'
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  limitations: [{
    type: String
  }],
  popular: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
