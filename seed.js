const mongoose = require('mongoose');
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections // move to another file later
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

const Donation = require('./models/Donation');
const { nanoid: nanoid } = require('nanoid');

users: [
  {
    // admin user
    _id: 1,
    email: 'test1@gmail.com',
    firstName: 'Sherlock',
    lastName: 'Holmes',
    gender: 'Male',
    role_id: 1,
    profession: 'Detective',
    bio:
      "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
    hashedPassword:
      '$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.',
    // Password: 'elementarymydearwatson'
  },
  {
    // donor user
    _id: 2,
    email: 'lemon@gmail.com',
    firstName: 'Elizabeth',
    lastName: 'Lemon',
    gender: 'Female',
    role_id: 2,
    profession: 'Writer',
    bio:
      "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
    hashedPassword:
      '$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm',
    // Password: 'damnyoujackdonaghy'
  },
  {
    // recipient user
    _id: 3,
    email: 'theboywholived@gmail.com',
    firstName: 'Harry',
    lastName: 'Potter',
    gender: 'Male',
    role_id: 3,
    profession: 'Student',
    bio:
      "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
    hashedPassword:
      '$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK',
    // Password: 'quidditch'
  },
];

let donations = [
  {
    _id: nanoid(),
    name: 'Center Table',
    quantity: 4,
    description:
      'A center table with a glass top. Used but in a good condition.',
    region: 'Jersey City',
    donor: 1,
    zipcode: '07307',
    status: 'submitted',
  },
  {
    _id: nanoid(),
    name: 'Chairs',
    quantity: 1,
    description: 'Cushioned Chairs set of 4.',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Office Chairs',
    quantity: 4,
    description: 'Hydraulic Office Chairs with head rest',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Bed',
    quantity: 4,
    description: 'Twin bed with mattress',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'submitted',
  },
  {
    _id: nanoid(),
    name: 'Table Lamp',
    quantity: 3,
    description: 'Table lamp with bulbs',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Floor Mat',
    quantity: 6,
    description: 'Bed Bath and Beyond area rug 37 X 60',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Comforter',
    quantity: 8,
    description: 'Utopia Twin XL comforter',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Boots',
    quantity: 3,
    description: 'Leather winter boots',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'submitted',
  },
  {
    _id: nanoid(),
    name: 'BedSheet',
    quantity: 10,
    description: 'BedSheet',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'approved',
  },
  {
    _id: nanoid(),
    name: 'Laptop bag',
    quantity: 2,
    description: 'Laptop Bag',
    region: 'Jersey City',
    zipcode: '07307',
    donor: 1,
    status: 'submitted',
  },
];

async function createDonations() {
  const createdDonations = await Donation.create(donations);
  setTimeout(() => {
    console.log(`${createdDonations.length} donations created !!`);
    process.exit();
  }, 1000);
}

createDonations();
