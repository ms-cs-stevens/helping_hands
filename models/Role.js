const mongoose = require('mongoose');
const { Schema } = mongoose;
const { nanoid } = require('nanoid');

const roleSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);
