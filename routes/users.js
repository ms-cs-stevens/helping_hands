const express = require('express');
const data = require('../data');
const donationData = data.donations;
const orderData = data.orders;
const userData = data.users;
const router = express.Router();
const authMiddleWare = require('../middlewares/auth');

router.get('/', authMiddleWare.adminRequired, async (req, res) => {
  try {
    let users = await userData.allUsers();
    res.status(200).render('users/index', {
      pageName: 'Users',
      users: users,
      title: 'User Donations',
      messages: req.flash(),
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

router.get('/:id/donations', authMiddleWare.donorRequired, async (req, res) => {
  let user;
  try {
    user = await userData.getUserById(id);
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  try {
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
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

router.get(
  '/:id/edit',
  authMiddleWare.authorizedUserRequired,
  async (req, res) => {
    try {
      let userOldData = await userData.getById(req.params.id);

      res.render('users/edit', {
        title: 'Profile Page',
        pageName: 'Edit User Info',
        currentUser: userOldData,
        genders: ['Male', 'Female', 'Others'],
        messages: req.flash(),
      });
    } catch (e) {
      res.status(422).render('users/edit', {
        title: 'Profile Page',
        pageName: 'Edit User Info',
        errors: [e],
        currentUser: user,
        genders: ['Male', 'Female', 'Others'],
        messages: req.flash(),
      });
    }
  }
);

router.patch(
  '/:id/update',
  authMiddleWare.authorizedUserRequired,
  async (req, res) => {
    let id = req.params.id;
    let updateData = req.body;
    let updatedUserProfile = {};
    let user;
    try {
      user = await userData.getById(id);
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
        updatedUserProfile.password2 = updateData.password2;
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
        console.log(e);
        req.flash('danger', e);
        res.redirect(`/users/${id}/edit`);
        // res.status(500).render('customError', {
        //   title: 'Internal Server Error',
        //   errorReason: 'Something went wrong',
        //   pageName: 'Internal Server Error',
        // });
      }
    } else {
      req.flash(
        'info',
        'No fields have been changed from their inital values, so no update has occurred'
      );
      res.status(422).redirect(`/users/${id}/edit`);
    }
  }
);

router.get(
  '/:id/review_donations',
  authMiddleWare.adminRequired,
  async (req, res) => {
    let searchedUser;
    try {
      // search for user from id given in params
      searchedUser = await userData.getById(req.params.id);
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: e,
        pageName: 'Error',
      });
    }

    try {
      let sessionUser = req.session.user;
      if (searchedUser && searchedUser._id != sessionUser._id)
        throw 'Invalid User';

      // proceed if user is valid and checks are passed
      let role_name = sessionUser.role_name;
      let allDonations = await donationData.allDonations();

      let options = {};
      if (role_name == 'admin') {
        let reviewedDonations =
          allDonations &&
          allDonations.filter((d) =>
            ['approved', 'rejected'].includes(d.status)
          );
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
    } catch (error) {
      res.status(500).render('customError', {
        title: 'Internal Server Error',
        errorReason: 'Something went wrong',
        pageName: 'Internal Server Error',
      });
    }
  }
);

router.get(
  '/:id/orders',
  authMiddleWare.recipientRequired,
  async (req, res) => {
    let searchedUser;
    try {
      // search for user from id given in params
      searchedUser = await userData.getById(req.params.id);
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: e,
        pageName: 'Error',
      });
    }

    try {
      let orders = await orderData.getOrdersByUser(req.session.user._id);
      orders = orders.filter((order) => order.items.length > 0);
      options = {
        pageName: 'My Orders',
        orders,
      };
      res.status(200).render('users/orders', {
        ...options,
        title: 'Orders',
        message: req.flash(),
      });
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

router.get('/:id/settings', async (req, res) => {
  res.status(404).render('customError', {
    title: 'Not found',
    errorReason: 'Page is not implemented',
    pageName: 'Error',
  });
});

router.patch(
  '/:id/toggle_active',
  authMiddleWare.adminRequired,
  async (req, res) => {
    let id = req.params.id;

    let user;
    try {
      user = await userData.getById(id);
    } catch (error) {
      res.status(404).render('customError', {
        title: 'Not found',
        errorReason: e,
        pageName: 'Error',
      });
    }

    try {
      let updatedObject = { active: !req.user.active };
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
