const home = require('./home');
const auth1 = require('./auth1');
const about = require('./about');
const login = require('./login');
const express = require('express');
const router = express.Router();

const initRoutes = (app) => {
 
  app.use('/', home);
  app.use('/about?', about); //this takes us to the about page
  app.use('/login?', login); //this takes us to the about page
  app.use('/auth1', auth1);
  app.use('*', (req, res) => {
    res.status(404).render("customError", {
      errorReason: "404 Not Found!!!",
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};

module.exports = initRoutes;
