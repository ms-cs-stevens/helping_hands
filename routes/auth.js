const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const { Role } = require('../models');
const authMiddlewares = require('../middlewares/auth');

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
    const { email, password } = req.body;
    let user = await userData.isAuthorizedUser(email, password);
    let role = await Role.findById(user.role_id);
    let role_name = role.name.toLocaleLowerCase();
    user.role_name = role_name; // Save user role name in session
    req.session.user = user;
    req.flash('success', 'Logged in successfully!');

    res.redirect(`/donations`);
  } catch (e) {
    res.status(401).render('auth/login', {
      title: 'Signin',
      pageName: 'Login',
      error: 'Provide a valid username and/or password.',
      layout: 'main.handlebars',
    });
  }
});

router.get('/logout', authMiddlewares.loginRequired, async (req, res) => {
  req.session.destroy();
  return res.redirect('/');
});

router.get('/signup', authMiddlewares.isLoggedIn, async (req, res) => {
  if (!req.query.uType || !['Donor', 'Recipient'].includes(req.query.uType)) {
    res.status(404).render('customError', {
      title: 'Not found',
      pageName: 'Sign Up',
      errorReason: 'The page you are looking for is not found',
      layout: 'main.handlebars',
    });
  }
  let roles = await Role.find(
    { name: { $in: ['Donor', 'Recipient'] } },
    '_id name'
  );

  res.render('auth/signup', {
    title: 'Sign Up',
    roles: roles,
    pageName: 'Sign Up',
    uType: req.query.uType,
    layout: 'main.handlebars',
  });
});

router.post('/register', authMiddlewares.isLoggedIn, async (req, res) => {
  try {
    let userInfo = req.body;
    userData.validateUserInfo(userInfo);
    let user = await userData.create(userInfo);
    if (user) {
      let role = await Role.findById(user.role_id);
      let role_name = role.name.toLocaleLowerCase();
      user.role_name = role_name; // Save user role name in session
      req.session.user = user;

      res.redirect(`/donations`);
    }
  } catch (error) {
    req.flash('error', error);
    res.status(422).render('customError', {
      title: 'Invalid Parameter',
      pageName: 'Sign Up',
      errorReason: error,
      layout: 'main.handlebars',
    });
  }
});

module.exports = router;
