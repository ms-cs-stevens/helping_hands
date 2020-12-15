const { Donation } = require('../models');
const express = require('express');
const router = express.Router();
const app = express();
const multer1 = require('../multer');
const cloudinary = require('../cloudinary');
const path = require('path');
const bodyParser = require('body-parser');
//file system
const fs = require('fs');
const static = express.static(__dirname + '/public');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/donations/new', multer1.upload, async (req, res) => {
  console.log('getting here.');
  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  if (req.method === 'POST') {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);

      //deleting file from server after upload
      // fs.unlinkSync(path);
    }
    res.status(200).json({
      message: 'Images uploaded successfully',
      data: urls,
    });

    //creating the new data into mongodb
    const donation = new Donation();
    donation.name = req.body.name;
    //
    //this follows other schema data lile image url, date and color of item
    await donation.save();
    res.send({
      message: 'blog is created',
    });
  } else {
    res.status(405).render('donations/new', {
      title: 'error',
      layout: 'main.handlebars',
      err: 'Images not uploaded successfully',
    });
  }
});

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
      donor_id,
      status = 'submitted'
    ) {
      let donationObj = {
        name,
        description,
        quantity,
        region,
        zipcode,
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
