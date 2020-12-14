const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
mongoose.Promise = global.Promise;

const donationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    name: {
      type: String,
      required: 'You must supply a name',
    },
    description: {
      type: String,
      required: 'You must supply a description',
    },
    in_stock: {
      type: Number,
      min: 0,
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
      required: 'You must supply a donor!',
    },
    status: {
      type: String,
      default: 'submitted',
      enum: ['submitted', 'approved', 'rejected', 'ordered'],
      lowercase: true,
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
    images: {
      type: Array,
      required: 'You must select an image',
    },
  },
  { timestamps: true }
);

donationSchema.index({ '$**': 'text' });

// function autopopulate(next) {
//   this.populate('donor');
//   next();
// }

// donationSchema.pre('find', autopopulate);
// donationSchema.pre('findOne', autopopulate);

donationSchema.pre('save', function (next) {
  if (this.isNew || this.status === 'submitted' || this.status === 'rejected')
    this.in_stock = this.get('quantity'); // considering quantity is input by client

  if (this.in_stock === 0) this.status = 'ordered';
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
