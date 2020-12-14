const authRoutes = require('./auth');
const userRoutes = require('./users');
const donationRoutes = require('./donations');
const orderRoutes = require('./orders');
const authMiddlewares = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use('/donations', donationRoutes);
  app.use('/orders', orderRoutes);

  // static paths
  app.get('/', authMiddlewares.isLoggedIn, async (req, res) => {
    res.status(200).render('static/home', {
      title: 'Home',
      messages: req.flash(),
      pageName: 'Home',
      sessionMessage: res.locals.sessionFlash,
      layout: 'main',
    });
  });

  app.get('/aboutUs', async (req, res) => {
    res.status(200).render('static/aboutUs', {
      title: 'About Helping Hands',
      layout: req.session.user ? 'main2' : 'main',
      pageName: 'About Us',
    });
  });

  app.get('/terms&conditions', async (req, res) => {
    res.status(200).render('static/terms&conditions', {
      title: 'Helping Hands: Terms of Service',
      layout: req.session.user ? 'main2' : 'main',
      pageName: 'Terms and Conditions',
    });
  });

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      pageName: 'Error!!',
      layout: req.session.user ? 'main2' : 'main',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
