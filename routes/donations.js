const express = require('express');
const donationData = require('../data/donations');

const router = express.Router();

router.get('/', async (req, res) => {
  let donations = await donationData.getApprovedDonations();
  res.status(200).render('donations/index', {
    title: 'Browse',
    donations: donations,
  });
});

router.get('/new', async (req, res) => {
  res.render('donations/new', { title: 'New Donation' });
});

router.get('/recent', async (req, res) => {
  let approvedDonations = await donationData.getApprovedDonations().slice(0, 8);
  res.render('partials/donation_listing', {
    layout: null,
    donations: approvedDonations,
  });
});

router.get('/:id', async (req, res) => {
  try {
    let donation = await donationData.getById(req.params.id);
    if (donation) {
      res.status(200).render('donations/show', {
        donation: donation,
        title: 'Donation',
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

router.post('/:id', async (req, res) => {
  try {
    let { name, description, quantity, region, zipcode } = req.body;
    let newDonation = await donationData.create(
      name,
      description,
      quantity,
      region,
      zipcode,
      req.session.user._id
    );

    res.redirect(`/donations/${newDonation._id}`);
  } catch (e) {
    res.json({ error: e });
  }
});

router.get('/:id/edit', async (req, res) => {
  let donation = {
    _id: 1,
    name: 'Center Table',
    quantity: 4,
    description:
      'A center table with a glass top. Used but in a good condition.',
    region: 'Jersey City',
    zip_code: '07307',
    images: [1, 2, 3],
    donor_id: 1,
    created_on: '11/01/2020',
    status: 'rejected',
    updated_on: '11/10/2020',
  };
  res.render('donations/edit', { title: 'Edit Donation', donation: donation });
});

router.patch('/:id/edit', async (req, res) => {
  let edited = false;
  if (edited) {
    res.redirect('/1');
  } else {
    res.json({ message: 'inside put' });
  }
});

router.delete('/:id/delete', async (req, res) => {
  let deleted = true;
  if (deleted) {
    res.redirect('/donations');
  }
});

module.exports = router;
