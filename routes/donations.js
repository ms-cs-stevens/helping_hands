const express = require('express');
const donationData = require('../data/donations');

const router = express.Router();

router.get('/', async (req, res) => {
  let approvedDonations = await donationData.getApprovedDonations();
  res.status(200).render('donations/index', {
    title: 'Browse',
    donations: approvedDonations,
  });
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  try {
    res.status(200).render('donations/show', {
      donation: donationData.getById(id),
      title: 'Donation',
    });
  } catch (e) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: "Sorry, We can't find the link",
    });
  }
});

module.exports = router;
