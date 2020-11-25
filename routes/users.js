const userData = require('../data/users')

/* //authorization function
const auth = function (req, res, next) {
  if (req.session.user)
    next();
  else
    res.status(403).render('customError', { message: 'Invalid request, you are not signed in!', errorReason: 'Unauthorized Access' });
}
 */
//routes
module.exports = (app) => {
  // profile page paths
  //donor
  app.use('/donor/:id', async (req, res) => {
    let donor = userData.getUserById(req.params.id);
    donor.title = `${donor.firstName}'s Donor Profile`;
    res.status(200).render('users/profile', donor);
  });
  //recipient
  app.use('/recipient/:id', auth, async (req, res) => {
    let recipient = userData.getUserById(req.params.id);
    recipient.title = `${recipient.firstName}'s Recipient Profile`;
    res.status(200).render('users/profile', recipient);
  });

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};