const bcrypt = require('bcryptjs');
const { User } = require('../models');
const saltRounds = 10; // TODO: Update later to some higher value

userObject = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
    phone: user.phone,
    role_id: user.role_id,
  };
};

let exportedMethods = {
  async getUserById(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    const user = await User.findById(id);

    if (!user) throw 'User not found';
    return user;
  },

  async getUserByEmail(email) {
    if (!email) throw 'You must provide a email';
    if (typeof email != 'string' || email.trim().length === 0)
      throw 'You must provide a valid email';

    const user = await User.findOne({ email: email });

    if (!user) throw 'User not found';
    // return userObject(user);
    return user;
  },

  async create(userInfo) {
    this.validateUserInfo(userInfo);
    const hash = await bcrypt.hash(userInfo.password, saltRounds);

    let user = await User.create({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      hashedPassword: hash,
      gender: userInfo.gender,
      role_id: userInfo.role_id,
    });

    if (!user) throw 'Trouble signing you up';
    return userObject(user);
  },

  validateUserInfo(user) {
    if (!user) throw 'Provide user details';
    if (!user.firstname) throw 'Provide firstname';
    if (!user.lastname) throw 'Provide lastname';
    if (!user.email) throw 'Provide email';

    if (!user.password) throw 'Provide password';
    if (user.password !== user.password2) throw 'Password does not match';
    if (user.password < 6) throw 'Password is less than 6 characters';

    // TODO: Add more validations here for data checking
  },

  async isAuthorizedUser(email, password) {
    const user = await this.getUserByEmail(email);
    let match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) throw 'Provide a valid username and/or password.';
    return userObject(user);
  },
};

module.exports = exportedMethods;
