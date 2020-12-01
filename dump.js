module.exports = {
  roles: [
    {
      name: 'Admin',
    },
    {
      name: 'Donor',
    },
    {
      name: 'Recipient',
    },
  ],
  users: [
    {
      // admin user
      email: 'admin@gmail.com',
      firstname: 'Sherlock',
      lastname: 'Holmes',
      gender: 'Male',
      role_id: 1,
      hashedPassword:
        '$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.',
      // Password: 'elementarymydearwatson'
    },
    {
      // donor user
      email: 'donor@gmail.com',
      firstname: 'Elizabeth',
      lastname: 'Lemon',
      gender: 'Female',
      role_id: 2,
      hashedPassword:
        '$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm',
      // Password: 'damnyoujackdonaghy'
    },
    {
      // recipient user
      email: 'recipient@gmail.com',
      firstname: 'Harry',
      lastname: 'Potter',
      gender: 'Male',
      role_id: 3,
      hashedPassword:
        '$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK',
      // Password: 'quidditch'
    },
  ],
  donations: [
    {
      name: 'Center Table',
      quantity: 4,
      description:
        'A center table with a glass top. Used but in a good condition.',
      region: 'Jersey City',
      donor_id: 1,
      zipcode: '07307',
      status: 'submitted',
    },
    {
      name: 'Chairs',
      quantity: 1,
      description: 'Cushioned Chairs set of 4.',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Office Chairs',
      quantity: 4,
      description: 'Hydraulic Office Chairs with head rest',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Bed',
      quantity: 4,
      description: 'Twin bed with mattress',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'submitted',
    },
    {
      name: 'Table Lamp',
      quantity: 3,
      description: 'Table lamp with bulbs',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Floor Mat',
      quantity: 6,
      description: 'Bed Bath and Beyond area rug 37 X 60',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Comforter',
      quantity: 8,
      description: 'Utopia Twin XL comforter',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Boots',
      quantity: 3,
      description: 'Leather winter boots',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'submitted',
    },
    {
      name: 'BedSheet',
      quantity: 10,
      description: 'BedSheet',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'approved',
    },
    {
      name: 'Laptop bag',
      quantity: 2,
      description: 'Laptop Bag',
      region: 'Jersey City',
      zipcode: '07307',
      donor_id: 1,
      status: 'submitted',
    },
  ],
};
