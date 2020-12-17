const { Donation } = require('../models');

function checkString(string, name) {
  if (!string) throw `You need to supply a ${name}!`;
}

function checkQuantity(quantity) {
  if (!quantity) throw `Quantity must be greater than 0!`;
}

function checkZipcode(zipcode) {
  if (!zipcode || !zipcode.length == 5) throw `Zipcode must be of 5 digits!`;
}

function checkImage(images) {
  if (!images) throw `Please provide alteast 1 image!`;
}

function checkForInvalidCredentials(donationInfo, donation) {
  let updatedObject = {};
  checkString(donationInfo.name, 'name');
  checkString(donationInfo.description, 'description');
  checkString(donationInfo.region, 'region');
  checkQuantity(donationInfo.quantity);
  checkZipcode(donationInfo.zipcode);
  checkImage(donationInfo.images);

  if (donationInfo.name != donation.name) {
    updatedObject.name = donationInfo.name;
  }
  if (donationInfo.description != donation.description) {
    updatedObject.description = donationInfo.description;
  }

  if (donationInfo.images != donation.images) {
    updatedObject.images = donationInfo.images;
  }

  if (donationInfo.quantity != donation.quantity) {
    updatedObject.quantity = donationInfo.quantity;
  }

  if (donationInfo.region != donation.region) {
    updatedObject.region = donationInfo.region;
  }

  if (donationInfo.zipcode != donation.zipcode) {
    updatedObject.zipcode = donationInfo.zipcode;
  }

  if (Object.keys(updatedObject).length <= 0)
    throw `No information has been specified to update the specified donation`;
}

module.exports = {
  async allDonations() {
    // sort all the donations by created_on date
    return await Donation.find().sort({ createdAt: 'desc' });
  },

  async filterByState(state) {
    let donations = await this.allDonations();
    return donations && donations.filter((d) => d.status == state);
  },

  async getById(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    let donation = await Donation.findById(id);
    if (!donation) throw 'Donation not found';
    return donation;
  },

  async search(searchTerm) {
    let searchResults;
    try {
      searchResults = await Donation.find(
        { status: 'approved', $text: { $search: searchTerm } },
        { score: { $meta: 'textScore' } }
      ).sort({
        score: { $meta: 'textScore' },
      });
    } catch (e) {
      throw e;
    }
    if (searchResults.length) return searchResults;
  },

  async create(
    name,
    description,
    quantity,
    region,
    zipcode,
    images,
    donor_id,
    status = 'submitted'
  ) {
    let donationObj = {
      name,
      description,
      quantity,
      region,
      zipcode,
      images,
      donor_id,
    };
    const newDonation = await Donation.create(donationObj);
    return newDonation;
  },

  async delete(id) {
    if (!id) throw 'You must provide an donation id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid donation id';
    let deletedDonation = await Donation.findOneAndDelete({ _id: id });
    return deletedDonation;
  },

  async filter() {
    let donations = await this.allDonations();
    let filtered = donations && donations.filter((d) => d.status == 'approved');
  },

  //update donation info
  async updateDonation(id, donationUpdateInfo, skipValidations = false) {
    //find the specified donation and all his/her information
    const donation = await this.getById(id);

    if (!donation) throw 'Donation not found';
    //handle no information being provided for a specified donation
    if (!skipValidations) {
      checkForInvalidCredentials(donationUpdateInfo, donation);
      // change the state back to submitted if updated the donation so that admin reviews it again
      donationUpdateInfo.status = 'submitted';
    }

    if (
      donationUpdateInfo &&
      Object.keys(donationUpdateInfo).includes('in_stock') &&
      donationUpdateInfo.in_stock < 1
    ) {
      donationUpdateInfo.status = 'ordered';
    }

    const updateInfo = await Donation.findOneAndUpdate(
      { _id: id },
      { $set: donationUpdateInfo },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified donation!';

    return await this.getById(id);
  },
};
