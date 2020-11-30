const seed = require('../seed');
const users = seed.users;

let exportedMethods = {
  getUserByEmail(email) {
    if (!email) throw 'You must provide a email';
    if (typeof email != 'string' || email.trim().length === 0)
      throw 'You must provide a valid email';

    const user = users.find((user) => user.email === email);

    if (!user) throw 'User not found';
    return user;
  },
};

module.exports = exportedMethods;
