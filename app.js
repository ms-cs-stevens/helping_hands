const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use('/public', static);
app.use(express.static('public/images'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

configRoutes(app);

app.listen(port, host, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
