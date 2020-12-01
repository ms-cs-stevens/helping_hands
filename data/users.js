const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');
const saltRounds = 10;

userObject = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    address1: user.address1,
    address2: user.address2,
    state: user.state,
    city: user.city,
    zipcode: user.zipcode,
  };
};

let exportedMethods = {
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

    // For saving nested objects using mongoose
    // const product = await Product.findOne({ name: "Fidget Spinner" });

    // product.features.coolColor = true;
    // await product.save(); // changes on features object wont be saved !

    // // you have to tell mongoose to save the changes :
    // product.markModified('features');
    // // and then save :
    // await product.save(); // changes on features object are saved :-)

    let user = User.create({
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      hashedPassword: hash,
      gender: userInfo.gender,
      role_id: userInfo.role_id,
    });
    console.log(user);

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

    // if (!user.type) throw 'User type is not present';

    // addressData.validateAddressInfo(user.address); // might now throwback error from address validation

    // if (!user.address1) throw 'Provide address2';
    // if (!user.address2) throw 'Provide address2';
    // if (!user.state) throw 'Provied state';
    // if (!user.city) throw 'Provide city';
    // if (!user.zipcode) throw 'Provide zipcode';
  },

  async isAuthorizedUser(email, password) {
    const user = await this.getUserByEmail(email);
    let match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) throw 'Provide a valid username and/or password.';
    return userObject(user);
  },
};

module.exports = exportedMethods;
