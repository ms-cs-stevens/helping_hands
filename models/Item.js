const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');
const Donation = require('./Donation');

const itemSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    quantity: {
      type: Number,
      min: 1,
      required: [
        true,
        'You must select quantity for an item to add into a cart',
      ],
    },
    recipient_id: { type: String, ref: 'User', required: true },
    order_id: { type: String, ref: 'Order', required: true },
    donation_id: { type: String, ref: 'Donation', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);
