const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const { Role } = require('../models');
const authMiddlewares = require('../middlewares/auth');

router.get('/login', authMiddlewares.isLoggedIn, async (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

router.post('/login', authMiddlewares.isLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userData.isAuthorizedUser(email, password);
    req.session.user = user;
    req.flash('success', 'Logged in successfully!');
    let role = await Role.findById(user.role_id);
    let role_name = role.name.toLocaleLowerCase();

    // redirect users to their specific dashboards
    res.redirect(`/users/${role_name}/${user._id}`);
  } catch (e) {
    res.status(401).render('auth/login', {
      title: 'Signin',
      error: 'Provide a valid username and/or password.',
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
  });
});

router.post('/register', authMiddlewares.isLoggedIn, async (req, res) => {
  try {
    let userInfo = req.body;
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
