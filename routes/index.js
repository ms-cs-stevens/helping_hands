const home = require('./home');
const express = require('express')
const router = express.Router();

const initRoutes = (app) => {
  app.use('/', home);
  app.use('*', (req, res) => {
    res.status(404).render("customError", {
      errorReason: "404 Not Found!!!",
      message: "Page you're looking for is not found. Please check your URL",
    });
  });
};

module.exports = initRoutes;
