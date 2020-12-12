const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main2',
  // Fixes Access has been denied to resolve the property "name" because it is not an "own property" of its parent.
  handlebars: allowInsecurePrototypeAccess(handlebars),
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    },
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
    equal: (a, b) => {
      return a == b;
    },
    or: (exp1, exp2) => {
      return exp1 || exp2;
    },
  },
  partialsDir: ['views/partials/'],
});

module.exports = {
  handlebarsInstance,
};
