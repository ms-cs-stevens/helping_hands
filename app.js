const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.static('public/images'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config({ path: 'variables.env' });

app.use(
  session({
    name: 'HelpingHands',
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
  partialsDir: ['views/partials/'],
});

app.engine('handlebars', handlebarsInstance.engine);

app.set('view engine', 'handlebars');

// Set session for application
app.use(
  session({
    name: 'HelpingHands',
    secret: process.env.SECRET_KEY || 'some secret string!',
    saveUninitialized: true,
    resave: false,
  })
);

// Logging Middleware
app.use(async (req, res, next) => {
  let authType = req.session.user ? 'Authenticated' : 'Non-Authenticated';
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${
      req.originalUrl
    } (${authType} User)`
  );
  next();
});

configRoutes(app);

// done! we export it so we can start the site in start.js
module.exports = app;
