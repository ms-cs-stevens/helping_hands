function loginRequired(req, res, next) {
  if (!req.session.user) return res.status(401).redirect('/auth/login'); // 401 or 403?
  return next();
}

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    req.flash('success', 'Already logged in!');
    return res.redirect('/donations');
  }
  return next();
}

function donorRequired(req, res, next) {
  authorizeUser(req, res, 'donor');
}

function recipientRequired(req, res, next) {
  authorizeUser(req, res, 'recipient');
}

function adminRequired(req, res, next) {
  authorizeUser(req, res, 'admin');
}

function authorizeUser(req, res, role_name) {
  try {
    let user = req.session.user;
    if (!user) return res.redirect('/auth/login');
    if (user.role_name !== role_name)
      return res.status(401).render('customError', {
        title: 'Unauthorized Access',
        errorReason: 'You do not have access to this page.',
      });

    return next();
  } catch (error) {
    res.status(500).render('customError', {
      title: 'Server error',
      errorReason: 'Something bad happened',
    });
  }
}

module.exports = {
  loginRequired,
  adminRequired,
  donorRequired,
  recipientRequired,
  isLoggedIn,
};
