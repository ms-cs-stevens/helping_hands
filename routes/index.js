const home = require('./home');
const auth1 = require('./auth1');
const about = require('./about');
const login = require('./login');
const d_login = require('./d_login');
const r_login = require('./r_login');
const express = require('express');
const router = express.Router();


const initRoutes = (app) => {
 
  app.use('/', home);
  app.use('/about', about); //this takes us to the about page
  app.use('/login', login); 
  app.use('/d_login', d_login); 
  app.use('/r_login', r_login); 
  app.use('/auth1', auth1);
  app.use('*', (req, res) => {
    res.status(404).render("custom_errors/error", {
      errorReason: "404 Not Found!!!",
      message: "Page you're looking for is not found. Please check your URL"
    });
  });
};

module.exports = initRoutes;
