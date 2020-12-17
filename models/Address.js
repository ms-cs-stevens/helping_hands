const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
mongoose.Promise = global.Promise;

const addressSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid() },
    street: {
      type: String,
    },

    apartment: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length == 5;
        },
        message: 'Invalid Zipcode. Zipcode must be atleast 5 digits!',
      },
    },
    donor_id: {
      type: String,
      ref: 'User',
      required: 'You must supply a donor!',
    },
  },
  { timestamps: true }
);

// addressSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Address', addressSchema);
