const express = require('express');
const data = require('../data');
const donationData = data.donations;
const itemData = data.items;
const orderData = data.orders;
const authMiddleware = require('../middlewares/auth');
const donationMiddleware = require('../middlewares/donation');
const router = express.Router();
const multer = require('multer');
const multerHelper = require('../helpers/multer');
const cloudinaryHelper = require('../helpers/cloudinary');

//file system
const fs = require('fs');

// gets all approved donations for display
router.get('/', async (req, res) => {
  try {
    let donations = await donationData.filterByState('approved');
    let sessionUser = req.session.user;
    let items = [];
    let showAddRemove = false;
    if (sessionUser) {
      let order = await orderData.findOrCreateDraftOrder(sessionUser._id);
      if (order._id != req.session.user.order._id) {
        req.session.user.order = order;
      }
      if (order.quantity > 0) items = await itemData.getByOrder(order._id);
      showAddRemove = 'recipient' == sessionUser.role_name;
    }

    let options = {
      title: 'Donated Goods',
      donations: donations,
      items: items,
      pageName: 'Donated Goods',
      messages: req.flash(),
      showAddRemove: showAddRemove,
      layout: req.session.user ? 'main2' : 'main',
    };

    res.status(200).render('donations/index', options);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

// gets most-recent 8 new donation creation form
router.get('/recent', async (req, res) => {
  try {
    let approvedDonations = await donationData.filterByState('approved');
    let recentDonations = approvedDonations && approvedDonations.slice(0, 4);
    res.render('partials/donation_listing', {
      layout: null,
      donations: recentDonations,
      showViewButton: true,
    });
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

// filter by state
router.get('/filter', async (req, res) => {
  try {
    let state = req.query.state;
    if (!state) throw 'You need to provide a state for filtering the item';
    let filteredDonations = await donationData.filterByState(state);
    res.render('partials/donation_listing', {
      layout: null,
      donations: filteredDonations,
      showApproveReject: true,
    });
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

router.post('/search', async (req, res) => {
  let searchTerm = req.body.searchTerm;
  try {
    if (!searchTerm.trim().length) {
      req.flash('danger', 'Please enter search term.');
      res.redirect('/donations');
    } else {
      let results = await donationData.search(searchTerm);
      let options;
      if (results && results.length) {
        options = {
          title: 'Search Results',
          donations: results,
          pageName: 'Donations',
          searchTerm: searchTerm,
        };
      } else {
        options = {
          title: 'Search Results',
          pageName: 'Donations',
          searchTerm: searchTerm,
        };
      }
      res.status(200).render('donations/index', {
        ...options,
        layout: req.session.user ? 'main2' : 'main',
      });
    }
  } catch (e) {
    res.status(404).render('customError', {
      title: 'Error',
      pageName: 'Not Found',
      errorReason: e,
    });
  }
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
  let donation,
    user = req.session.user;
  try {
    donation = await donationData.getById(req.params.id);
  } catch (error) {
    // TODO: Investigate the issue
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  let item;
  try {
    item = await itemData.getItem(user._id, user.order._id, donation._id);
  } catch (error) {}

  try {
    let allowActions =
      ['submitted', 'rejected'].includes(donation.status) &&
      (user._id == donation.donor_id || user.role_name == 'admin');

    res.status(200).render('donations/show', {
      donation: donation,
      item: item,
      title: 'Donation',
      pageName: 'Donation Details',
      allowActions,
      showAddRemove: user && 'recipient' == user.role_name,
      layout: req.session.user ? 'main2' : 'main',
      messages: req.flash(),
    });
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
    try {
      let donation = await donationData.getById(req.params.id);
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
    let donation;
    let id = req.params.id;
    let donationInfo = req.body;
    try {
      donation = await donationData.getById(id);
      if (!donation) throw `Donation not found`;
      const uploader = async (path) =>
        await cloudinaryHelper.uploads(path, 'Images');
      const urls = [];
      const files = req.files;

      if (!files)
        throw "There was a problem uploading your image. Please upload images with 'jpeg | jpg | png | gif' format only";

      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
      }

      let images = [];

      urls.forEach((u) => {
        images.push(u.url);
      });

      donationInfo.images = images;
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
        let error = err || err.message;
        res.status(422).render(`donations/edit`, {
          title: 'Donate Goods',
          pageName: 'Edit Donation',
          donation: donation,
          errors: [error],
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
    try {
      await donationData.getById(req.params.id);
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: error,
        pageName: 'Error',
      });
    }

    try {
      let deleted = await donationData.delete(req.params.id);
      if (deleted) {
        let deletedDonationName = deleted.name;
        req.flash(
          'danger',
          `Donation '${deletedDonationName}' was deleted successfully.`
        );
        res.redirect('/donations');
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      res.status(500).render('customError', {
        title: 'Internal Server Error',
        pageName: 'Error',
        errorReason:
          'Please contact administrator of the site for more details.',
      });
    }
  }
);

router.patch('/:id/approve', authMiddleware.adminRequired, async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'approved' };

  let donation;
  try {
    donation = await donationData.getById(id);
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  try {
    let updatedDonation = await donationData.updateDonation(
      id,
      updatedObject,
      true
    );
    if (updatedDonation) {
      req.flash('success', 'Donation approved!');
      res.redirect(`/users/${req.session.user._id}/review_donations`);
    }
  } catch (error) {
    res.status(422).render('customError', {
      title: 'Invalid Data Entered',
      pageName: 'Error',
      errorReason: e,
    });
  }
});

router.patch('/:id/reject', authMiddleware.adminRequired, async (req, res) => {
  let id = req.params.id;
  let updatedObject = { status: 'rejected' };

  let donation;
  try {
    donation = await donationData.getById(id);
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  try {
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
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: e,
    });
  }
});

router.patch(
  '/:id/donate',
  authMiddleware.recipientRequired,
  async (req, res) => {
    let id = req.params.id;
    let sessionUser = req.session.user;
    let item, order, donation, updatedItem;
    try {
      order = await orderData.findOrCreateDraftOrder(sessionUser._id);
      donation = await donationData.getById(id);
    } catch (error) {
      res.status(404).json({
        message: error,
        status: '404',
      });
    }

    if (order._id != sessionUser.order._id) {
      sessionUser.order = order;
    }

    // check if donation is approved and has suffiecient in stock quantity

    try {
      item = await itemData.getItem(sessionUser._id, order._id, id);
    } catch (error) {
      updatedItem = await itemData.create({
        quantity: 1,
        recipient_id: sessionUser._id,
        order_id: order._id,
        donation_id: id,
      });
    }

    try {
      if (item) updatedItem = await itemData.updateQuantity(item._id, 1);

      if (updatedItem) {
        order = await orderData.getById(order._id);
        req.session.user.order = order;
        res.status(200).json({
          message: 'Item added into cart',
          status: '200',
          cart: order.quantity,
        });
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      res.status(500).json({
        message: 'Please contact administrator of the site for more details.',
        status: '500',
      });
    }
  }
);

router.patch(
  '/:id/withdraw',
  authMiddleware.recipientRequired,
  async (req, res) => {
    let id = req.params.id;
    let sessionUser = req.session.user;
    let order, item, donation;

    try {
      order = await orderData.getDraftOrderByUser(sessionUser._id);
      donation = await donationData.getById(id);
      item = await itemData.getItem(sessionUser._id, order._id, id);
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: error,
        pageName: 'Error',
      });
    }

    try {
      if (order._id != sessionUser.order._id) {
        sessionUser.order = order;
      }

      let updatedItem = await itemData.updateQuantity(item._id, -1);
      if (updatedItem) {
        order = await orderData.getById(order._id); // fetch updated order to replace in session
        req.session.user.order = order;
        res.json({
          message: 'Item deleted from cart',
          status: '200',
          cart: order.quantity,
        });
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
      res.status(500).render('customError', {
        title: 'Internal Server Error',
        pageName: 'Error',
        errorReason:
          'Please contact administrator of the site for more details.',
      });
    }
  }
);

module.exports = router;
