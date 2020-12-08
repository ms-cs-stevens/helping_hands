const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Fixes Access has been denied to resolve the property "name" because it is not an "own property" of its parent.
  handlebars: allowInsecurePrototypeAccess(handlebars),
  // Specify helpers which are only registered on this instance.
  helpers: {
    concat: (string1, string2) => {
      return string1 + string2;
    },
    dateToString: (date) => {
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return date.toLocaleDateString(undefined, options);
    },
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
    userType: (name, uType) => {
      return name === uType ? 'selected' : '';
    },
  },
  partialsDir: ['views/partials/'],
});

module.exports = {
  handlebarsInstance,
};
