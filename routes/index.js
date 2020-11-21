const login = require('./login');
const data = require('../data');
const donationData = data.donations;

module.exports = (app) => {
  app.use('/login', login);

  // static paths
  app.get('/', async (req, res) => {
    res.status(200).render('static/home', { title: 'Home' });
  });
  app.get('/about', async (req, res) => {
    res.status(200).render('static/about', { title: 'About' });
  });
  app.get('/auth', async (req, res) => {
    res.status(200).render('auth/form', { title: 'Login/Signup' });
  });

  app.get('/browse', async (req, res) => {
    let approvedDonations = await donationData.getApprovedDonations();
    res.status(200).render('donations/browse', {
      title: 'Browse',
      donations: approvedDonations,
    });
  });

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
