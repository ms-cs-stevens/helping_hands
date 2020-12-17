const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstname: {
      type: String,
      required: [true, 'You must provide a firstname'],
    },
    lastname: {
      type: String,
      required: [true, 'You must provide a lastname'],
    },
    hashedPassword: {
      type: String,
      required: [true, 'You must provide a password'],
    },
    phone: String,
    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'You must provide an email'],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'is invalid',
      ],
      index: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    role_id: { type: String, ref: 'Role', required: true },
    address_id: { type: String, ref: 'Address' },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
