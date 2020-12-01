const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const { Role } = require('../models');
const authHelpers = require('../helpers/auth');

router.get('/login', authHelpers.isLoggedIn, async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

router.post('/login', authHelpers.isLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    req.session.user = await userData.isAuthorizedUser(email, password);
    req.flash('success', 'Logged in successfully!');
    res.redirect('/');
  } catch (e) {
    res.status(401).render('auth/login', {
      title: 'Signin',
      error: e || 'Provide a valid username and/or password.',
    });
  }
});

router.get('/logout', authHelpers.loginRequired, async (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

router.get('/signup', authHelpers.isLoggedIn, async (req, res) => {
  let roles = await Role.find(
    { name: { $in: ['Donor', 'Recipient'] } },
    '_id name'
  );
  res.render('auth/signup', {
    title: 'Sign Up',
    roles: roles,
  });
});

router.post('/register', authHelpers.isLoggedIn, async (req, res) => {
  try {
    let userInfo = req.body;
    console.log(userInfo);
    userData.validateUserInfo(userInfo);
    let user = await userData.create(userInfo);
    if (user) {
      req.session.user = user;
    }
    res.redirect('/');
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
