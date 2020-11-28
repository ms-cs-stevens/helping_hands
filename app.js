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
    concat: (string1, string2) => {
      return string1 + string2;
    },
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
  partialsDir: ['views/partials/'],
});

app.use('/donations/:id/edit', (req, res, next) => {
  if (req.body.method == 'patch') {
    req.method = 'PATCH';
  }
  next();
});

app.use('/donations/:id/delete', (req, res, next) => {
  req.method = 'DELETE';
  next();
});

app.use('/', (req, res, next) => {
  let authType =
    req.session && req.session.user ? 'Authenticated' : 'Not-Authenticated';
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${
      req.originalUrl
    } (${authType} User)`
  );
  next();
});

app.engine('handlebars', handlebarsInstance.engine);

app.set('view engine', 'handlebars');

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
