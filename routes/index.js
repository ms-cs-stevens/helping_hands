const authRoutes = require('./auth');
const userRoutes = require('./users');
const donationRoutes = require('./donations');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/donations', donationRoutes);

  // static paths
  app.get('/', async (req, res) => {
    res.status(200).render('static/home', {
      title: 'Home',
      authenticated: req.session.user ? true : false,
    });
  });
  app.get('/about', async (req, res) => {
    res.status(200).render('static/about', { title: 'About' });
  });

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
