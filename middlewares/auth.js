function loginRequired(req, res, next) {
  if (!req.session.user) return res.status(401).redirect('/auth/login'); // 401 or 403?
  return next();
}

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    req.flash('success', 'Already logged in!');
    return res.redirect('/');
  }
  return next();
}

function donorRequired(res, req, next) {
  if (!req.session.user) return res.redirect('/auth/login');

  return next();
}

function recipientRequired(res, req, next) {
  return next();
}

function adminRequired(req, res, next) {
  if (!req.user) res.status(401).json({ status: 'Please log in' });
  return knex('users')
    .where({ username: req.user.username })
    .first()
    .then((user) => {
      if (!user.admin)
        res.status(401).json({ status: 'You are not authorized' });
      return next();
    })
    .catch((err) => {
      res.status(500).json({ status: 'Something bad happened' });
    });
}

module.exports = {
  loginRequired,
  adminRequired,
  donorRequired,
  recipientRequired,
  isLoggedIn,
};
