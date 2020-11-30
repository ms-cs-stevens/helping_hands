const mongoose = require('mongoose');
const Donation = mongoose.model('Donation');
const { nanoid: nanoid } = require('nanoid');
// const { update } = require('../models/Donation');

module.exports = {
  async allDonations() {
    // sort all the donations by created_on date
    return await Donation.find().sort({ created_on: 'desc' });
  },

  async getApprovedDonations() {
    let donations = await this.allDonations();
    return donations && donations.filter((d) => d.status == 'approved');
  },

  async getById(id) {
    let donation = await Donation.findById(id).exec();
    return donation;
  },

  async create(
    name,
    description,
    quantity,
    region,
    zipcode,
    donor,
    status = 'submitted'
  ) {
    const donation = await new Donation({
      _id: nanoid(),
      name,
      description,
      quantity,
      region,
      zipcode,
      donor,
      status,
    }).save();
    return donation;
  },

  async delete(id) {
    let deletedDonation = await Donation.findOneAndDelete({ _id: id });
    return deletedDonation;
  },

  async update(id, params) {},
};
