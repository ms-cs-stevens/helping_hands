const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

// TODO: Need to check what happend if we get id value in api request
// TODO: validation for phone in mongoose
const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstname: {
      type: String,
      required: [true, "can't be blank"],
    },
    lastname: {
      type: String,
      required: [true, "can't be blank"],
    },
    hashedPassword: {
      type: String,
      required: [true, "can't be blank"],
    },
    phone: String,
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'is invalid',
      ],
      index: true,
      unique: true,
      // uniqueCaseInsensitive: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    role_id: { type: String, ref: 'Role', required: true },
    address: [{ type: String, ref: 'Address' }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
