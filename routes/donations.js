const express = require('express');
const donationData = require('../data/donations');
const authMiddleware = require('../middlewares/auth');
const donationMiddleware = require('../middlewares/donation');
const router = express.Router();
const multerHelper = require('../helpers/multer');
const cloudinaryHelper = require('../helpers/cloudinary');

//file system
const fs = require('fs');
const multer = require('multer');

// gets all approved donations for display
router.get('/', async (req, res) => {
  let donations = await donationData.getApprovedDonations();
  res.status(200).render('donations/index', {
    title: 'Donated Goods',
    donations: donations,
    pageName: 'Donated Goods',
    messages: req.flash(),
    layout: req.session.user ? 'main2' : 'main',
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
router.get('/new', authMiddleware.donorRequired, async (req, res) => {
  res.render('donations/new', {
    title: 'New Donation',
    pageName: 'New Donation',
  });
});

// creates a new donation
router.post(
  '/',
  authMiddleware.donorRequired,
  multerHelper.upload,
  async (req, res) => {
    try {
      const uploader = async (path) =>
        await cloudinaryHelper.uploads(path, 'Images');
      const urls = [];
      const files = req.files;

      if (files.length == 0) throw 'Please select atleast one image';

      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);

        //deleting file from server after upload
        fs.unlinkSync(path);
      }

      let images = [];

      urls.forEach((u) => {
        images.push(u.url);
      });

      let { name, description, quantity, region, zipcode } = req.body;
      createdDonation = await donationData.create(
        name,
        description,
        quantity,
        region,
        zipcode,
        images,
        req.session.user._id
      );

      req.flash('success', 'Donation Created Successfully!!');
      res.redirect(`/donations/${createdDonation._id}`);
    } catch (err) {
      if (err.errors) {
        let errorKeys = Object.keys(err.errors);
        let errors = [];
        errorKeys.forEach((key) => errors.push(err.errors[key].message));
        res.status(422).render(`donations/new`, {
          title: 'Donate Goods',
          pageName: 'New Donation',
          donation: req.body,
          errors,
        });
      } else {
        res.status(422).render(`donations/new`, {
          title: 'Donate Goods',
          pageName: 'New Donation',
          donation: req.body,
          errors: [err],
        });
      }
    }
  }
);

// gets donation by id
router.get('/:id', async (req, res) => {
  let user = req.session.user;
  try {
    let donation = await donationData.getById(req.params.id);

    let allowActions =
      ['submitted', 'rejected'].includes(donation.status) &&
      (user._id == donation.donor_id || user.role_name == 'admin');

    if (donation) {
      res.status(200).render('donations/show', {
        donation: donation,
        title: 'Donation',
        pageName: 'Donation Details',
        allowActions,
        layout: req.session.user ? 'main2' : 'main',
        messages: req.flash(),
      });
    } else {
      res.status(404).render('customError', {
        title: 'Not found',
        pageName: 'Error',
        errorReason: 'Donation not found!',
      });
    }
  } catch (e) {
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: e,
    });
  }
});

// gets edit donation form
router.get(
  '/:id/edit',
  authMiddleware.donorRequired,
  donationMiddleware.canPerformActions,
  async (req, res) => {
    let donation = await donationData.getById(req.params.id);
    try {
      res.render('donations/edit', {
        title: 'Edit Donation',
        pageName: 'Edit Donation',
        donation: donation,
        edit: true,
      });
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: error,
        pageName: 'Error',
      });
    }
  }
);

// edits the donation form
router.patch(
  '/:id/update',
  authMiddleware.donorRequired,
  multerHelper.upload,
  donationMiddleware.canPerformActions,
  async (req, res) => {
    let id = req.params.id;
    let donationInfo = req.body;
    const uploader = async (path) =>
      await cloudinaryHelper.uploads(path, 'Images');
    const urls = [];
    const files = req.files;

    if (files.length == 0) throw 'Please select atleast one image';

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);

      //deleting file from server after upload
      fs.unlinkSync(path);
    }

    let images = [];

    urls.forEach((u) => {
      images.push(u.url);
    });

    donationInfo.images = images;

    let donation;
    try {
      donation = await donationData.getById(id);
      const updatedDonation = await donationData.updateDonation(
        id,
        donationInfo
      );
      if (updatedDonation) {
        req.flash('success', 'Donation updated successfully');
        res.redirect(`/donations/${id}`);
      }
    } catch (err) {
      if (err.errors) {
        let errorKeys = Object.keys(err.errors);
        let errors = [];
        errorKeys.forEach((key) => errors.push(err.errors[key].message));
        res.status(422).render(`donations/edit`, {
          title: 'Donate Goods',
          pageName: 'Edit Donation',
          donation: donation,
          errors,
        });
      } else {
        res.status(422).render(`donations/edit`, {
          title: 'Donate Goods',
          pageName: 'Edit Donation',
          donation: donation,
          errors: [err],
        });
      }
    }
  }
);

// deletes the donation from database
router.delete(
  '/:id/delete',
  authMiddleware.donorRequired,
  donationMiddleware.canPerformActions,
  async (req, res) => {
    let deleted = await donationData.delete(req.params.id);
    if (deleted) {
      let deletedDonationName = deleted.name;
      req.flash(
        'danger',
        `Donation '${deletedDonationName}' was deleted successfully.`
      );
      res.redirect('/donations');
    }
  }
);

router.patch('/:id/approve', authMiddleware.adminRequired, async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'approved' };
  try {
    let donation = await donationData.getById(id);
    if (!donation) throw 'Donation Not found';
    const updatedDonation = await donationData.updateDonation(
      id,
      updatedObject,
      true
    );
    if (updatedDonation) {
      req.flash('success', 'Donation approved!');
      res.redirect(`/users/${req.session.user._id}/review_donations`);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

router.patch('/:id/reject', authMiddleware.adminRequired, async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'rejected' };
  try {
    let donation = await donationData.getById(id);
    if (!donation) throw 'Donation Not found';
    let updatedDonation = await donationData.updateDonation(
      id,
      updatedObject,
      true
    );
    if (updatedDonation) {
      req.flash('info', 'Donation Rejected!');
      res.redirect(`/users/${req.session.user._id}/review_donations`);
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
