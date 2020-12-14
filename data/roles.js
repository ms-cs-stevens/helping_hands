const { Role } = require('../models');

let exportedMethods = {
  async roleName(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    const role = await Role.findById(id);
    if (!role) throw 'Role not found';

    return role.name;
  },
};

module.exports = exportedMethods;
