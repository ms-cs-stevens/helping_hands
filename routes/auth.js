const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const { Role } = require('../models');
const authMiddlewares = require('../middlewares/auth');

router.get('/login', authMiddlewares.isLoggedIn, async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
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

    // redirect users to their specific dashboards
    res.redirect(`/users/${user._id}/dashboard`);
  } catch (e) {
    res.status(401).render('auth/login', {
      title: 'Signin',
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

      // redirect users to their specific dashboards
      res.redirect(`/users/${user._id}/dashboard`);
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
