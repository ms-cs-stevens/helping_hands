const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
mongoose.Promise = global.Promise;

const donationSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid() },
    name: {
      type: String,
      required: 'You must supply a name',
    },
    description: {
      type: String,
      required: 'You must supply a description',
    },
    quantity: {
      type: Number,
      min: 1,
      required: 'Your donation must have a quantity',
    },
    region: {
      type: String,
      required: 'You must supply a region',
    },
    donor_id: {
      type: String,
      ref: 'User',
      // required: 'You must supply a donor!',
    },
    status: {
      type: String,
      default: 'pending',
    },
    zipcode: {
      type: String,
      validate: {
        validator: function (v) {
          return v.length == 5;
        },
        message: 'Invalid Zipcode!',
      },
    },
    images: {
      type: Array,
      required: 'You must select an image',
    },
  },
  { timestamps: true }
);

// function autopopulate(next) {
//   this.populate('donor');
//   next();
// }

// donationSchema.pre('find', autopopulate);
// donationSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Donation', donationSchema);
