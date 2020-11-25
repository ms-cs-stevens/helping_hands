const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid');

let exportedMethods = {

  //search for a user by ID
  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw 'User not found';
    return user;
  },

  //search for a user by ID
  async addUser(firstName, lastName, email, gender, active_flag, phone, role_id, bio, ssn) {
    const userCollection = await users();
    //check if user has supplied all necessary information before registering
    if (!firstName || !lastName || !email || !phone) throw "Missing Information! All necessary information needs to be supplied to register a user!"
    //individual user object
    let newUser = {
      _id: uuid(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      active: active_flag,
      phone: phone,
      role_id: role_id,
      bio: bio,
      ssn: ssn
    }

    //add user to database
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Registration failed!';
    return await this.getUserById(newInsertInformation.insertedId);
  },

  //delete user
  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) throw `Could not find and delete the specified user!`;

    //returns true if the deletion is successful
    return true;
  },

  //update user info
  async updateUser(id, updatedUser) {
    //find the specified user and all his/her information
    const user = await this.getUserById(id);

    //handle no information being provided for a specified user
    if (!Object.keys(updatedUser)) throw `No information has been specified to update the specified user`;

    let userUpdateInfo;

    if (updatedUser.firstName) userUpdateInfo.firstName = updatedUser.firstName;
    else userUpdateInfo.firstName = user.firstName;

    if (updatedUser.lastName) userUpdateInfo.lastName = updatedUser.lastName;
    else userUpdateInfo.lastName = user.lastName;

    if (updatedUser.email) userUpdateInfo.email = updatedUser.email;
    else userUpdateInfo.email = user.email;

    if (updatedUser.phone) userUpdateInfo.phone = updatedUser.phone;
    else userUpdateInfo.phone = user.phone;

    if (updatedUser.gender) userUpdateInfo.gender = updatedUser.gender;
    else userUpdateInfo.gender = user.gender;

    if (updatedUser.bio) userUpdateInfo.bio = updatedUser.bio;
    else userUpdateInfo.bio = user.bio;

    if (updatedUser.ssn) userUpdateInfo.ssn = updatedUser.ssn;
    else userUpdateInfo.ssn = user.ssn;

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: id },
      { $set: userUpdateInfo }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Could not find and update the specified user!';
    //error

    return await this.getUserById(id);
  }
};

module.exports = exportedMethods;
