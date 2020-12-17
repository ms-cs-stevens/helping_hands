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
    and: (exp1, exp2) => {
      return exp1 && exp2;
    },
    returnFirst: (array) => {
      return array[0];
    },
    itemQuantity: (items, donationId) => {
      let item = items;
      if (Array.isArray(items)) {
        item = items.find((item) => item.donation_id === donationId);
      }
      return item ? item.quantity : 0;
    },
    cartCount: (order) => {
      if (!order) return 0;
      return order.quantity;
    },
    ordersAvailable: (orders) => {
      return orders.length !== 0;
    },
    placed: (order) => {
      return order.status !== 'draft';
    },
    donation_available: (inStock) => {
      return inStock > 0;
    },
  },
  partialsDir: ['views/partials/'],
});

module.exports = {
  handlebarsInstance,
};
