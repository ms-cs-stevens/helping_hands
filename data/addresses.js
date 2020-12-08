addressObject = (address) => {
  return {
    _id: address._id,
    address1: address.address1,
    address2: address.address2,
    state: address.state,
    city: address.city,
    zipcode: address.zipcode,
  };
};

let exportedMethods = {
  // async create(addressInfo) {
  //   this.validateAddressInfo(addressInfo);

  //   let address = db.Address.create({
  //     address1: addressInfo.address1,
  //     address2: addressInfo.address2,
  //     state: addressInfo.state,
  //     city: addressInfo.city,
  //     zipcode: addressInfo.zipcode
  //   });

  //   if (!address) throw 'Trouble signing you up'
  //   return addressObject(address);
  // },

  validateAddressInfo(address) {
    if (!address) throw 'Provide user details';
    if (!address.street) throw 'Provide address2';
    if (!address.apartment) throw 'Provide address2';
    if (!address.state) throw 'Provied state';
    if (!address.city) throw 'Provide city';
    if (!address.zipcode) throw 'Provide zipcode';
  },
};

module.exports = exportedMethods;
