const express = require('express');
const donationData = require('../data/donations');
const { update } = require('../data/users');
const userData = require('../data/users');
const { users } = require('../dump');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.get('/', authMiddleWare.adminRequired, async (req, res) => {
  let users = await userData.allUsers();
  res.status(200).render('users/index', {
    pageName: 'Users',
    users: users,
    title: 'User Donations',
    messages: req.flash(),
  });
});

router.get('/:id/donations', authMiddleWare.donorRequired, async (req, res) => {
  let allDonations = await donationData.allDonations();
  let myDonations =
    allDonations && allDonations.filter((d) => d.donor_id == req.params.id);
  options = {
    pageName: 'My Donations',
    myDonations,
  };
  res.status(200).render('users/my_donations', {
    ...options,
    title: 'User Donations',
    messages: req.flash(),
  });
});

router.get('/:id/edit', authMiddleWare.loginRequired, async (req, res) => {
  try {
    let userOldData = await userData.getUserById(req.params.id);
    if (!userOldData) throw 'User Does Not Exist!';

    res.render('users/edit', {
      title: 'Profile Page',
      pageName: 'Edit User Info',
      loggedInUser: userOldData,
      genders: ['Male', 'Female', 'Others'],
      messages: req.flash(),
    });
  } catch (e) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: e,
      pageName: 'Error',
      messages: req.flash(),
    });
  }
});

router.patch('/:id/update', authMiddleWare.loginRequired, async (req, res) => {
  let id = req.params.id;
  let updateData = req.body;
  let updatedUserProfile = {};
  let user;
  try {
    user = await userData.getUserById(id);
    if (updateData.firstname && updateData.firstname !== user.firstname)
      updatedUserProfile.firstname = updateData.firstname;
    if (updateData.lastname && updateData.lastname !== user.lastname)
      updatedUserProfile.lastname = updateData.lastname;
    if (updateData.email && updateData.email !== user.email)
      updatedUserProfile.email = updateData.email;
    if (updateData.gender && updateData.gender !== user.gender)
      updatedUserProfile.gender = updateData.gender;
    if (updateData.password.length > 0)
      updatedUserProfile.password = updateData.password;
    if (updateData.password2.length > 0)
      updatedUserProfile.password2 == updateData.password2;
  } catch (e) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: e,
      pageName: 'Error',
    });
  }
  if (Object.keys(updatedUserProfile).length) {
    try {
      const updated = await userData.update(id, updatedUserProfile);
      if (updated) {
        req.flash('success', 'User profile updated successfully');
        res.redirect(`/users/${id}/edit`);
      }
    } catch (e) {
      res.status(422).render('users/edit', {
        title: 'Profile Page',
        pageName: 'Edit User Info',
        errors: [e],
        loggedInUser: updateData,
        genders: ['Male', 'Female', 'Others'],
        messages: req.flash(),
      });

      res.status(500).render('customError', {
        title: 'Internal Server Error',
        errorReason: 'Something went wrong',
        pageName: 'Internal Server Error',
      });
    }
  } else {
    req.flash(
      'error',
      'No fields have been changed from their inital values, so no update has occurred'
    );
    res.status(422).redirect('/donations');
  }
});

router.get(
  '/:id/review_donations',
  authMiddleWare.adminRequired,
  async (req, res) => {
    let sessionUser = req.session.user;
    // search for user from id given in params
    let searchedUser = await userData.getUserById(req.params.id);
    if (searchedUser && searchedUser._id != sessionUser._id)
      throw 'Invalid User';

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
        pageName: 'Review Donations',
        showApproveReject: true,
        reviewedDonations,
        submittedDonations,
        title: 'Review Donations',
        messages: req.flash(),
      };

      res.render('users/review_donations', options);
    }
  }
);

router.get(
  '/:id/orders',
  authMiddleWare.recipientRequired,
  async (req, res) => {
    res.json({ messages: 'Implement my orders page here' });
  }
);

router.get('/:id/settings', async (req, res) => {
  res.json({ messages: 'Implement Settings page here' });
});

router.patch(
  '/:id/toggle_active',
  authMiddleWare.adminRequired,
  async (req, res) => {
    let id = req.params.id;
    let updatedObject = { active: !req.user.active };
    try {
      let user = await userData.getById(id);
      if (!user) throw 'User Not found';
      let updatedUser = await userData.update(id, updatedObject);
      if (updatedUser) {
        req.flash('info', 'Status updated for the user.');
        res.redirect(`/users`);
      }
    } catch (error) {
      res.status(401).render('customError', {
        title: 'Unauthorized Access',
        pageName: 'Unauthorized Access!',
        error: error,
      });
    }
  }
);

module.exports = router;
