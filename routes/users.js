const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const data = require('../data');
const userData = data.users;

router.get('/login', async (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/');
  } else {
    res.render('users/login', {
      title: 'Login',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = userData.getUserByEmail(email);
    let match = await bcrypt.compare(password, user.hashedPassword);
    if (match) {
      req.session.user = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profession: user.profession,
        bio: user.bio,
      };

      res.redirect('/');
    } else {
      res.status(401).render('users/login', {
        title: 'Signin',
        error: 'Provide a valid username and/or password.',
      });
    }
  } catch (e) {
    res.status(401).render('users/login', {
      title: 'Signin',
      error: e || 'Provide a valid username and/or password.',
    });
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  return res.redirect('/');
  // res.render('customError', {
  //   title: 'Logout',
  //   message: 'You have been succesfully logged out of the application.',
  // });
});

router.get('/new', async (req, res) => {
  res.render('users/new', {
    title: 'Sign Up',
  });
});

router.post('/create', async (req, res) => {
  console.log('inside user post');
  res.redirect('users/new');
});

module.exports = router;
