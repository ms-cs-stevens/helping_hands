const express = require('express');
const donationData = require('../data/donations');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.get('/:id/dashboard', authMiddleWare.loginRequired, async (req, res) => {
  let user = req.session.user;
  let role_name = user.role;
  let allDonations = await donationData.allDonations();

  let options = {};
  if (role_name == 'admin') {
    let reviewedDonations =
      allDonations &&
      allDonations.filter((d) => ['approved', 'rejected'].includes(d.status));
    let submittedDonations =
      allDonations &&
      allDonations.filter((d) => ['submitted'].includes(d.status));

    options = {
      showApproveReject: true,
      reviewedDonations,
      submittedDonations,
    };
  } else if (role_name == 'donor') {
    let myDonations =
      allDonations && allDonations.filter((d) => d.donor_id == req.params.id);
    options = {
      myDonations,
    };
  } else {
    let donations = await donationData.getApprovedDonations();
    options = {
      donations,
    };
  }
  res.status(200).render('users/dashboard', {
    ...options,
    title: 'Dashboard',
    message: req.flash(),
  });
});

module.exports = router;
