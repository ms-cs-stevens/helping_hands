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
  async allUsers() {
    let users = await User.find().sort({ firstname: 'asc' });
    return users;
  },

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

  //update user
  async update(id, updateData) {
    //find the specified user and all his/her information
    const old = await this.getUserById(id);
    if (!old) throw 'User does not Exist';

    this.validateUpdateInfo(updateData);

    const updateInfo = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw `Error ecountered while updating the specified user: ${updateInfo.errors}`;

    return await this.getUserById(id);
  },

  validateUserInfo(user) {
    if (!user) throw 'Provide user details';
    if (!user.firstname) throw 'Provide firstname';
    if (!user.lastname) throw 'Provide lastname';
    if (!user.email) throw 'Provide email';

    if (!user.password) throw 'Provide password';
    if (user.password !== user.password2) throw 'Password does not match';
    if (user.password < 6) throw 'Password is less than 6 characters';
    /*
    this.checkName(user.firstname);
    this.checkName(user.lastname);
    this.checkEmail(user.email);
    this.checkPassword(user.password); */

    // TODO: Add more validations here for data checking
  },

  // TODO: Resolve validation function errors

  /* checkName(input) {
    if (typeof input !== 'string') throw `Name needs to be a string`;
    const nameFormat = new RegExp('[A-Za-z]');

    if (nameFormat.test(input)) {
    }
    throw `Name can only contain alphabets`;
  },

  checkEmail(input) {
    if (typeof input !== 'string') throw `E-Mail Address has to be a string.`;
    const emailformat = new RegExp(
      '(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))'
    );
    if (!emailformat.test(input.toLowerCase()))
      throw `${input} is not a valid E-Mail Address.`;
  },

  checkPassword(input) {
    const passwordFormat = new RegExp(
      '(?=.*d)(?=.*[a-zA-Z])[a-zA-Z0-9].{6,16}'
    );
    if (input.length >= 6 && input.length <= 16)
      if (!passwordFormat.test(input))
        throw `Password needs to be a valid string of 6-16 characters with at least 1 digit and 1 special character`;
      else throw `Password needs to be between 6 and 16 characters in length`;
  }, */

  async validateUpdateInfo(user) {
    /* if (!user) throw 'Error! User does not exist';
    if (user.firstname) this.checkName(user.firstname);
    if (user.lastname) this.checkName(user.lastname);
    if (user.email) this.checkEmail(user.email);

    if (user.password) {
      if (user.password !== user.password2) throw 'Password does not match';
      this.checkPassword(user.password);
    } */
  },

  async isAuthorizedUser(email, password) {
    const user = await this.getUserByEmail(email);
    let match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) throw 'Provide a valid username and/or password.';
    return userObject(user);
  },
};

module.exports = exportedMethods;
