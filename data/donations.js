const { Donation } = require('../models');
const express = require('express');
const router = express.Router();
const app = express();

(module.exports = app),
  {
    async allDonations() {
      // sort all the donations by created_on date
      return await Donation.find().sort({ createdAt: 'desc' });
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
      myImage,
      donor_id,
      status = 'submitted'
    ) {
      let donationObj = {
        name,
        description,
        quantity,
        region,
        zipcode,
        myImage,
        donor_id,
        status,
      };

      const newDonation = await Donation.create(donationObj);
      return newDonation;
    },

    async delete(id) {
      let deletedDonation = await Donation.findOneAndDelete({ _id: id });
      return deletedDonation;
    },

    //update donation info
    async updateDonation(id, donationUpdateInfo) {
      //find the specified donation and all his/her information
      const donation = await this.getById(id);
      if (!donation) throw 'Donation not found';
      //handle no information being provided for a specified donation
      if (!Object.keys(donationUpdateInfo))
        throw `No information has been specified to update the specified donation`;

      const updateInfo = await Donation.findOneAndUpdate(
        { _id: id },
        { $set: donationUpdateInfo },
        { runValidators: true }
      );

      if (updateInfo.errors)
        throw 'Could not find and update the specified donation!';

      return await this.getById(id);
    },
  };
