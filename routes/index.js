const login = require('./login');

const initRoutes = (app) => {
  // static paths
  app.use('/', (req, res) => {
    res.status(200).render('static/home', { title: 'Home' });
  });
  app.use('/about', (req, res) => {
    res.status(200).render('static/about', { title: 'About' });
  });
  app.use('/auth', (req, res) => {
    res.status(200).render('auth/form', { title: 'Login/Signup' });
  });

  app.use('/login', login);

  // unknown paths
  app.use('*', (req, res) => {
    res.status(404).render('customError', {
      errorReason: '404 Not Found!!!',
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};

module.exports = initRoutes;
