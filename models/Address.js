const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const addressSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    street: {
      type: String,
      required: [true, 'You must provide street'],
    },
    apartment: {
      type: String,
    },
    state: {
      type: String,
      required: [true, 'You must provide state'],
    },
    city: {
      type: String,
      required: [true, 'You must provide city'],
    },
    zipcode: {
      type: String,
      required: [true, 'You must provide zip code'],
      validate: {
        validator: function (v) {
          return v.length == 5;
        },
        message: 'Invalid Zipcode. Zipcode must be atleast 5 digits!',
      },
    },
    user_id: {
      type: String,
      ref: 'User',
      required: [true, 'You must supply a user!'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Address', addressSchema);
