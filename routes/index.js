const authRoutes = require('./auth');
const userRoutes = require('./users');
const donationRoutes = require('./donations');
const authMiddlewares = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/donations', donationRoutes);

  // static paths
  app.get('/', authMiddlewares.isLoggedIn, async (req, res) => {
    res.status(200).render('static/home', {
      title: 'Home',
      message: req.flash('success'),
      sessionMessage: res.locals.sessionFlash,
    });
  });

  app.get('/about', async (req, res) => {
    res.status(200).render('static/about', { title: 'About' });
  });

  //dynamic paths
  app.get('/donnor', async (req, res) => {
    res.status(200).render('users/donnor', { title: 'Donnors Page' });
  });
  app.get('/admin', async (req, res) => {
    res.status(200).render('users/admin', { title: 'Admin Page' });
  });
  app.get('/receipt', async (req, res) => {
    res.status(200).render('users/receipt', { title: 'Receipt Page' });
  });

  //dynamic paths
  app.get('/donnor', async (req, res) => {
    res.status(200).render('users/donnor', { title: 'Donnors Page' });
  });
  app.get('/admin', async (req, res) => {
    res.status(200).render('users/admin', { title: 'Admin Page' });
  });
  app.get('/receipt', async (req, res) => {
    res.status(200).render('users/receipt', { title: 'Receipt Page' });
  });
  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
