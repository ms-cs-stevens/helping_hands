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
  app.get('/about', async (req, res) => {
    res
      .status(200)
      .render('static/about', { title: 'About', layout: 'main.handlebars' });
  });

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
