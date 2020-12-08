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
const { User, Role, Donation } = require('./models');
const { users, donations, roles } = require('./dump');

async function createRoles() {
  const createdRoles = await Role.create(roles);
  console.log(`${createdRoles.length} roles created !!`);
}

async function createUsers() {
  let user,
    createdUsers = 0;
  const roles = await Role.find(
    { name: { $in: ['Admin', 'Donor', 'Recipient'] } },
    '_id'
  );
  for (let i = 0; i < 3; i++) {
    user = users[i];
    user.role_id = roles[i]._id;
    await User.create(user);
    createdUsers++;
  }
  console.log(`${createdUsers} users created !!`);
}

async function createDonations() {
  const createdDonations = await Donation.create(donations);
  console.log(`${createdDonations.length} donations created !!`);
}

async function dumpDatabase() {
  await createRoles();
  await createUsers();
  await createDonations();
  process.exit();
}

dumpDatabase();
