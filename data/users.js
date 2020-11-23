const users = require('../seed');

let exportedMethods = {
  getUserByEmail(email) {
    if (!email) throw 'You must provide a email';
    if (typeof email != 'string' || email.trim().length === 0)
      throw 'You must provide a valid email';

    const user = users.filter((user) => user.email === email);

    if (user.length === 0) throw 'User not found';
    return user[0];
  },
};

module.exports = exportedMethods;
