const mongoose = require('mongoose');
const Donation = mongoose.model('Donation');
const { nanoid: nanoid } = require('nanoid');

module.exports = {
  allDonations() {
    return [
      {
        _id: 1,
        name: 'Center Table',
        quantity: 4,
        description:
          'A center table with a glass top. Used but in a good condition.',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'rejected',
        updated_on: '11/10/2020',
      },
      {
        _id: 2,
        name: 'Chairs',
        quantity: 1,
        description: 'Cushioned Chairs set of 4.',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 3,
        name: 'Office Chairs',
        quantity: 4,
        description: 'Hydraulic Office Chairs with head rest',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 4,
        name: 'Bed',
        quantity: 4,
        description: 'Twin bed with mattress',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 5,
        name: 'Table Lamp',
        quantity: 3,
        description: 'Table lamp with bulbs',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 6,
        name: 'Floor Mat',
        quantity: 6,
        description: 'Bed Bath and Beyond area rug 37 X 60',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 7,
        name: 'Comforter',
        quantity: 8,
        description: 'Utopia Twin XL comforter',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 8,
        name: 'Boots',
        quantity: 3,
        description: 'Leather winter boots',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 9,
        name: 'BedSheet',
        quantity: 10,
        description: 'BedSheet',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
      {
        _id: 10,
        name: 'Laptop bag',
        quantity: 2,
        description: 'Laptop Bag',
        region: 'Jersey City',
        zip_code: '07307',
        images: [1, 2, 3],
        donor_id: 1,
        created_on: '11/01/2020',
        status: 'approved',
        updated_on: '11/10/2020',
      },
    ];
  },

  getApprovedDonations() {
    return this.allDonations().filter((d) => d.status == 'approved');
  },

  async getById(id) {
    let donation = await Donation.findById(id).exec();
    return donation;
  },

  async create(
    name,
    description,
    quantity,
    region,
    zipcode,
    donor,
    status = 'submitted'
  ) {
    const donation = await new Donation({
      _id: nanoid(),
      name,
      description,
      quantity,
      region,
      zipcode,
      donor,
      status,
    }).save();
    return donation;
  },
};
