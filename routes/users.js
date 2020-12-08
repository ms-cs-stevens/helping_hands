const express = require('express');
const donationData = require('../data/donations');
const router = express.Router();

router.get('/admin/:id', async (req, res) => {
  let donations = await donationData.allDonations();
  res.status(200).render('users/admin/dashboard', {
    title: 'Admin',
    showApproveReject: true,
    donations,
    message: req.flash(),
  });
});

router.get('/donor/:id', async (req, res) => {
  let donations = await donationData.getApprovedDonations();
  res.status(200).render('users/admin/dashboard', {
    title: 'Donor',
    donations,
    message: req.flash(),
  });
});

router.get('/recipient/:id', async (req, res) => {
  let donations = await donationData.getApprovedDonations();
  res.status(200).render('users/admin/dashboard', {
    title: 'Recipient',
    donations,
    message: req.flash(),
  });
});

module.exports = router;
