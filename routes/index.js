const loginRoutes = require('./login');
const donationRoutes = require('./donations');
const userRoutes = require('./users');

module.exports = (app) => {
  app.use('/login', loginRoutes);
  app.use('/donations', donationRoutes);
  //routes for respective profile pages
  app.use('/user', userRoutes);

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

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};
