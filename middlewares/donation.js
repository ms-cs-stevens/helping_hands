const donationData = require('../data/donations');

module.exports = {
  async canPerformActions(req, res, next) {
    let user = req.session.user;
    let donation = await donationData.getById(req.params.id);
    if (!donation) {
      res.status(404).render('customError', {
        title: 'Not Found',
        errorReason: 'Donation not found!',
        pageName: 'Not Found',
      });
    }
    let allowActions =
      ['submitted', 'rejected'].includes(donation.status) &&
      (user._id == donation.donor_id || user.role_name == 'admin');

    if (!allowActions) {
      res.status(401).render('customError', {
        title: 'Unauthorized Access',
        errorReason: 'You are not allowed to access this resource.',
        pageName: 'Unauthorized',
      });
    }
    next();
  },
};
