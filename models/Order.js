const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const orderSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    status: {
      type: String,
      enum: ['draft', 'placed', 'confirmed', 'Rejected'],
      lowercase: true,
      required: [true, 'You must provide status of the order'],
    },
    quantity: {
      type: Number,
      min: 0,
      required: [true, 'You must provide total item quantity in the order'],
      default: 0,
    },
    recipient_id: { type: String, ref: 'User', required: true },
    items: [{ type: String, ref: 'Item' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
