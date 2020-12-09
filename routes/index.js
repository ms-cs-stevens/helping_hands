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
      message: req.flash('success'),
      sessionMessage: res.locals.sessionFlash,
      layout: 'main.handlebars',
    });
  });
  app.get('/aboutUs', async (req, res) => {
    res.status(200).render('static/aboutUs', { title: 'About Helping Hands' });
  });
  app.get('/terms&conditions', async (req, res) => {
    res.status(200).render('static/terms&conditions', {
      title: 'Helping Hands: Terms of Service',
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
