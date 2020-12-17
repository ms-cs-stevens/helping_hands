const Address = require('../models/Address');

// let exportedMethods = {
//   // async create(addressInfo) {
//   //   this.validateAddressInfo(addressInfo);

//   //   let address = db.Address.create({
//   //     address1: addressInfo.address1,
//   //     address2: addressInfo.address2,
//   //     state: addressInfo.state,
//   //     city: addressInfo.city,
//   //     zipcode: addressInfo.zipcode
//   //   });

//   //   if (!address) throw 'Trouble signing you up'
//   //   return addressObject(address);
//   // },

//   validateAddressInfo(address) {
//     if (!address) throw 'Provide user details';
//     if (!address.street) throw 'Provide address2';
//     if (!address.apartment) throw 'Provide address2';
//     if (!address.state) throw 'Provied state';
//     if (!address.city) throw 'Provide city';
//     if (!address.zipcode) throw 'Provide zipcode';
//   },
// };

// module.exports = exportedMethods;

module.exports = {
  async getById(id) {
    let address = await Address.findById(id).exec();
    return address;
  },

  async create(street, apartment, state, city, zipcode, donor_id) {
    let addressObj = { street, apartment, state, city, zipcode, donor_id };

    const newAddress = await Address.create(addressObj);
    return newAddress;
  },
};
