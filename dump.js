// TODO: Remove password value before submitting the project
module.exports = {
  roles: [
    {
      _id: 1,
      name: 'Admin',
    },
    {
      _id: 2,
      name: 'Donor',
    },
    {
      _id: 3,
      name: 'Recipient',
    },
  ],
  users: [
    {
      // admin user
      _id: 'adm-123',
      email: 'admin@gmail.com',
      firstname: 'Sherlock',
      lastname: 'Holmes',
      gender: 'Male',
      role_id: 1,
      hashedPassword:
        '$2a$16$CVsoxBlSgxVJqAVkTsGxvew.VPuwVMNAacsvXXevnM2DvJLSOFR/C',
    },
    {
      // donor user
      _id: 'don-123',
      email: 'donor@gmail.com',
      firstname: 'Elizabeth',
      lastname: 'Lemon',
      gender: 'Female',
      role_id: 2,
      hashedPassword:
        '$2a$16$CVsoxBlSgxVJqAVkTsGxvew.VPuwVMNAacsvXXevnM2DvJLSOFR/C',
    },
    {
      // recipient user
      _id: 'rec-123',
      email: 'recipient@gmail.com',
      firstname: 'Harry',
      lastname: 'Potter',
      gender: 'Male',
      role_id: 3,
      hashedPassword:
        '$2a$16$CVsoxBlSgxVJqAVkTsGxvew.VPuwVMNAacsvXXevnM2DvJLSOFR/C',
    },
  ],
  donations: [
    {
      name: 'Center Table',
      quantity: 4,
      description:
        'A center table with a glass top. Used but in a good condition.',
      region: 'Jersey City',
      donor_id: 'don-123',
      zipcode: '07307',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608076843/Images/Zio-Coffee-Table-Front-1_pkniqz.png',
      ],
      status: 'submitted',
    },
    {
      name: 'Chairs',
      quantity: 1,
      description: 'Cushioned Chairs set of 4.',
      region: 'Jersey City',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608076843/Images/2020_xchair_x1_grey_flex_headrest_nohmt_02_front_right_r1_3500px_aslsa9.webp',
      ],
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Office Chairs',
      quantity: 4,
      description: 'Hydraulic Office Chairs with head rest',
      region: 'Jersey City',
      zipcode: '07307',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608076842/Images/Noir_-Iron_-_Black_300x300_scshlv.jpg',
      ],
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Sofa',
      quantity: 4,
      description: 'Sofa with cushions',
      region: 'Jersey City',
      zipcode: '07307',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608076843/Images/roxie_gray_accent-chair_2008335_753044_egxxjw.webp',
      ],
      donor_id: 'don-123',
      status: 'submitted',
    },
    {
      name: 'Table Lamp',
      quantity: 3,
      description: 'Table lamp with bulbs',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Floor Mat',
      quantity: 6,
      description: 'Bed Bath and Beyond area rug 37 X 60',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Comforter',
      quantity: 8,
      description: 'Utopia Twin XL comforter',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Boots',
      quantity: 3,
      description: 'Leather winter boots',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'submitted',
    },
    {
      name: 'Bed',
      quantity: 10,
      description: 'Bed',
      region: 'Jersey City',
      zipcode: '07307',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608077103/Images/anton-solid-wood-bed-o_dyd7lk.jpg',
      ],
      donor_id: 'don-123',
      status: 'approved',
    },
    {
      name: 'Laptop bag',
      quantity: 2,
      description: 'Laptop Bag',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'submitted',
    },
    {
      name: 'Mattress',
      quantity: 2,
      description: 'Queen Size Mattresses, used for a month',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'rejected',
    },
    {
      name: 'Bath Robe',
      quantity: 1,
      description: 'Used Bath Robe',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'rejected',
    },
    {
      name: 'Wooden Chair',
      quantity: 2,
      description: 'Wooden Chair',
      region: 'Jersey City',
      images: [
        'https://res.cloudinary.com/helpinghands101/image/upload/v1608076842/Images/cherry-wood-seat-cherry-wood-frame-flash-furniture-dining-chairs-xudgw0008vrtchy-64_600_xqapdr.jpg',
      ],
      zipcode: '07307',
      donor_id: 'don-123',
      status: 'submitted',
    },
  ],
};
