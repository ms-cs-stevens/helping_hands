const donationData = require('../data/donations');

module.exports = {
  async canPerformActions(req, res, next) {
    let donation = await donationData.getById(req.params.id);
    if (!donation) {
      res.status(404).render('customError', {
        title: 'Not Found',
        errorReason: 'Donation not found!',
        pageName: 'Not Found',
      });
    }
    if (
      donation.donor_id == req.session.user._id ||
      req.session.user.role_name == 'admin'
    ) {
      next();
    } else {
      console.log(req.session.user.role_name);
      res.status(401).render('customError', {
        title: 'Unauthorized Access',
        errorReason: 'You are not allowed to access this resource.',
        pageName: 'Unauthorized',
      });
    }
  },
};
