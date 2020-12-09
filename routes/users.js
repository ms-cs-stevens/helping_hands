const express = require('express');
const donationData = require('../data/donations');
const userData = require('../data/users');

const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.get('/:id/dashboard', authMiddleWare.loginRequired, async (req, res) => {
  try {
    let sessionUser = req.session.user;
    // search for user from id given in params
    let searchedUser = await userData.getUserById(req.params.id);
    if (searchedUser.role_id != sessionUser.role_id) throw 'Invalid User';

    // proceed if user is valid and checks are passed
    let role_name = sessionUser.role_name;
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
  } catch (error) {
    res.status(404).render('customError', {
      errorReason: 'Not Found',
      message: "The page you're looking for is not found!",
    });
  }
});

module.exports = router;
