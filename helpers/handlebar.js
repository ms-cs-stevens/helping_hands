const exphbs = require('express-handlebars');
const moment = require('moment');
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
      return moment(date).fromNow();
    },
    equal: (a, b) => {
      a ||= '';
      b ||= '';
      return a.toLocaleLowerCase() == b.toLocaleLowerCase();
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
    optionSelected: (option, value) => {
      return option === value ? 'selected' : '';
    },
  },
  partialsDir: ['views/partials/'],
});

module.exports = {
  handlebarsInstance,
};
