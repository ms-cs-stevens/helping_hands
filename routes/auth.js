const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const orderData = data.orders;
const { Role } = require('../models');
const authMiddlewares = require('../middlewares/auth');
const xss = require('xss');

router.get('/login', authMiddlewares.isLoggedIn, async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    pageName: 'Login',
    layout: 'main.handlebars',
  });
});

router.post('/login', authMiddlewares.isLoggedIn, async (req, res) => {
  try {
    //validate login
    const email = xss(req.body.email);
    const password = xss(req.body.password);
    let user = await userData.isAuthorizedUser(email, password);
    let role = await Role.findById(user.role_id);
    let role_name = role.name.toLocaleLowerCase();
    let order = await orderData.findOrCreateDraftOrder(user._id);
    user.role_name = role_name; // Save user role name in session
    user.order = order; // Save draft order in session
    req.session.user = user;
    req.flash('success', 'Logged in successfully!');

    res.redirect(`/donations`);
  } catch (err) {
    if (err.errors) {
      let errorKeys = Object.keys(err.errors);
      let errors = [];
      errorKeys.forEach((key) => errors.push(err.errors[key].message));
      res.status(401).render(`auth/login`, {
        title: 'Signin',
        pageName: 'Login',
        layout: 'main',
        errors,
      });
    } else {
      res.status(401).render('auth/login', {
        title: 'Signin',
        pageName: 'Login',
        errors: [err],
        layout: 'main',
      });
    }
  }
});

router.get('/logout', authMiddlewares.loginRequired, async (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

router.get('/signup', authMiddlewares.isLoggedIn, async (req, res) => {
  let uType = xss(req.query.uType);
  if (!uType || !['Donor', 'Recipient'].includes(uType)) {
    res.status(404).render('customError', {
      title: 'Not found',
      pageName: 'Sign Up',
      errorReason: 'The page you are looking for is not found',
      layout: 'main.handlebars',
    });
  }

  try {
    let roles = await Role.find(
      { name: { $in: ['Donor', 'Recipient'] } },
      '_id name'
    );

    res.render('auth/signup', {
      title: 'Sign Up',
      roles: roles,
      pageName: 'Sign Up',
      uType: uType,
      layout: 'main.handlebars',
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

router.post('/register', authMiddlewares.isLoggedIn, async (req, res) => {
  let userInfo = req.body;
  let role = await Role.findById(userInfo.role_id);
  let role_name = role.name.toLocaleLowerCase();
  try {
    let reqBod = req.body;
    let userInfo = {};
    let keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i++)
      userInfo[keys[i]] = xss(reqBod[keys[i]]);
    userData.validateUserInfo(userInfo);
    let user = await userData.create(userInfo);
    if (user) {
      let order = await orderData.findOrCreateDraftOrder(user._id);
      user.order = order; // Save draft order in session
      user.role_name = role_name; // Save user role name in session
      req.session.user = user;

      res.redirect(`/donations`);
    }
  } catch (err) {
    let roles = await Role.find(
      { name: { $in: ['Donor', 'Recipient'] } },
      '_id name'
    );
    if (err.errors) {
      let errorKeys = Object.keys(err.errors);
      let errors = [];
      errorKeys.forEach((key) => errors.push(err.errors[key].message));
      res.status(422).render(`auth/signup`, {
        title: 'Sign Up',
        pageName: 'Sign Up',
        roles: roles,
        uType: role_name,
        layout: 'main.handlebars',
        newUser: userInfo,
        errors,
      });
    } else {
      let error = err || err.message;
      res.status(422).render(`auth/signup`, {
        title: 'Sign Up',
        pageName: 'Sign Up',
        roles: roles,
        uType: role_name,
        layout: 'main.handlebars',
        newUser: userInfo,
        errors: [error],
      });
    }
  }
});

module.exports = router;
