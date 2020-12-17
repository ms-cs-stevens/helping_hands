const { Address, User } = require('../models');

module.exports = {
  async getByUser(user_id) {
    let address = await Address.findOne({ user_id: user_id });
    return address;
  },

  async create(street, apartment, state, city, zipcode, user_id) {
    let addressObj = { street, apartment, state, city, zipcode, user_id };

    const newAddress = await Address.create(addressObj);

    let updateInfo = await User.findOneAndUpdate(
      { _id: user_id },
      { $set: { address_id: newAddress._id } },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw `Error ecountered while updating the specified user: ${updateInfo.errors}`;

    if (!newAddress) throw 'Trouble creating an address';
    return newAddress;
  },

  async update(id, updateData) {
    const oldAddress = await this.getById(id);
    if (!oldAddress) throw 'Address does not Exist';

    const updateInfo = await Address.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { runValidators: true }
    );

    if (updateInfo.errors) throw 'Trouble updating an address';
    return await this.getById(id);
  },

  async getById(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    const address = await Address.findById(id);

    if (!address) throw 'Address not found';
    return address;
  },
};
