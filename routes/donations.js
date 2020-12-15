const express = require('express');
const donationData = require('../data/donations');
const router = express.Router();
const multer1 = require('../multer');
const cloudinary = require('../cloudinary');
const path = require('path');
const bodyParser = require('body-parser');
//file system
const fs = require('fs');
const { url } = require('inspector');
const static = express.static(__dirname + '/public');

// gets all approved donations for display
router.get('/', async (req, res) => {
  let donations = await donationData.getApprovedDonations();
  res.status(200).render('donations/index', {
    title: 'Browse',
    donations: donations,
    message: req.flash(),
  });
});

// gets most-recent 8 new donation creation form
router.get('/recent', async (req, res) => {
  let approvedDonations = await donationData.getApprovedDonations();
  let recentDonations = approvedDonations && approvedDonations.slice(0, 4);
  res.render('partials/donation_listing', {
    layout: null,
    donations: recentDonations,
    showViewButton: true,
  });
});

// renders new donation creation form
router.get('/new', async (req, res) => {
  res.render('donations/new', { title: 'New Donation' });
});

// creates a new donation
router.post('/new', multer1.upload, async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'Images');
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);

    //deleting file from server after upload
    fs.unlinkSync(path);
  }
  if (files.length == 0) {
    res.status(405).render('donations/new', {
      title: 'error',

      msg: 'Images not uploaded successfully, Please Select an Image',
    });
    return;
  }
  res.status(200).render('donations/new', {
    title: 'uploaded',

    msg: 'Images uploaded successfully',
  });

  // //creating the new data into mongodb
  // const donation = new Donation();
  // donation.name = req.body.name;
  // //
  // //this follows other schema data lile image url, date and color of item
  // await donation.save();
  // res.send({
  //   message: 'blog is created',
  // });

  // try {
  //   let { name, description, quantity, region, zipcode } = req.body;
  //   let newDonation = await donationData.create(
  //     name,
  //     description,
  //     quantity,
  //     region,
  //     zipcode,
  //     req.session.user._id
  //   );

  //   req.flash('success', 'Donation Created Successfully!!');

  //   res.redirect(`/donations/${newDonation._id}`);
  // } catch (e) {
  //   req.flash('danger', e.message);
  //   res.redirect(`/donations/new`, { donation: newDonation });
  // }
});

// gets donation by id
router.get('/:id', async (req, res) => {
  try {
    let donation = await donationData.getById(req.params.id);
    if (donation) {
      res.status(200).render('donations/show', {
        donation: donation,
        title: 'Donation',
        message: req.flash('success'),
      });
    } else {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: 'Donation not found!',
      });
    }
  } catch (e) {
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      errorReason: e,
    });
  }
});

// gets edit donation form
router.get('/:id/edit', async (req, res) => {
  try {
    let donation = await donationData.getById(req.params.id);
    if (!donation) throw 'Donation not found!';
    res.render('donations/edit', {
      title: 'Edit Donation',
      donation: donation,
    });
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
    });
  }
});

// edits the donation form
router.patch('/:id/update', async (req, res) => {
  let id = req.params.id;
  let donationInfo = req.body;
  let updatedObject = {};
  try {
    let donation = await donationData.getById(id);
    if (donationInfo.name && donationInfo.name !== donation.name) {
      updatedObject.name = donationInfo.name;
    }
    if (
      donationInfo.description &&
      donationInfo.description !== donation.description
    ) {
      updatedObject.description = donationInfo.description;
    }

    if (donationInfo.quantity && donationInfo.quantity !== donation.quantity) {
      updatedObject.quantity = donationInfo.quantity;
    }

    if (donationInfo.region && donationInfo.region !== donation.region) {
      updatedObject.region = donationInfo.region;
    }

    if (donationInfo.zipcode && donationInfo.zipcode !== donation.zipcode) {
      updatedObject.zipcode = donationInfo.zipcode;
    }
  } catch (e) {
    res.status(404).json({ error: 'Donation not found' });
    return;
  }
  if (Object.keys(updatedObject).length > 0) {
    try {
      const updatedDonation = await donationData.updateDonation(
        id,
        updatedObject
      );
      if (updatedDonation) {
        req.flash('success', 'Donation updated successfully');
        res.redirect(`/donations/${id}`);
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({
      error:
        'No fields have been changed from their inital values, so no update has occurred',
    });
  }
});

// deletes the donation from database
router.delete('/:id/delete', async (req, res) => {
  let deleted = await donationData.delete(req.params.id);
  if (deleted) {
    let deletedDonationName = deleted.name;
    req.flash(
      'success',
      `Donation '${deletedDonationName}' was deleted successfully.`
    );
    res.redirect('/donations');
  }
});

router.patch('/:id/approve', async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'approved' };
  try {
    let donation = await donationData.getById(id);
    if (!donation) throw 'Donation Not found';
    const updatedDonation = await donationData.updateDonation(
      id,
      updatedObject
    );
    if (updatedDonation) {
      req.flash('success', 'Donation approved!');
      res.redirect(`/users/admin/${req.session.user._id}`);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

router.patch('/:id/reject', async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'rejected' };
  try {
    let donation = await donationData.getById(id);
    if (!donation) throw 'Donation Not found';
    let updatedDonation = await donationData.updateDonation(id, updatedObject);
    if (updatedDonation) {
      req.flash('success', 'Donation Rejected!');
      res.redirect(`/users/admin/${req.session.user._id}`);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
