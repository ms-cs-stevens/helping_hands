const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    street: String,
    apartment: String,
    state: String,
    city: String,
    zipcode: String,
    user_id: { type: String, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
