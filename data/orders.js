const { Order } = require('../models');

let exportedMethods = {
  async getById(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    const order = await Order.findById(id);

    if (!order) throw 'order not found';
    return order;
  },

  async getOrdersByUser(userID) {
    if (!userID) throw 'You must provide a userID';
    if (typeof userID != 'string' || userID.trim().length === 0)
      throw 'You must provide a valid userID';

    return await Order.find({ recipient_id: userID }).sort({
      createdAt: 'desc',
    });
  },

  async getDraftOrderByUser(userID) {
    if (!userID) throw 'You must provide a userID';
    if (typeof userID != 'string' || userID.trim().length === 0)
      throw 'You must provide a valid userID';

    let draftOrder = await Order.findOne({
      recipient_id: userID,
      status: 'draft',
    });

    if (!draftOrder) throw 'Order not found';

    return draftOrder;
  },

  async findOrCreateDraftOrder(recipientId) {
    if (!recipientId) throw 'You must provide an id';
    if (typeof recipientId != 'string' || recipientId.trim().length === 0)
      throw 'You must provide a valid recipientId';

    let order = await Order.findOne({
      recipient_id: recipientId,
      status: 'draft',
    });

    if (!order) {
      order = await Order.create({
        status: 'draft',
        recipient_id: recipientId,
      });
    }

    return order;
  },

  async updateOrder(id, orderUpdateInfo) {
    //find the specified donation and all his/her information
    const order = await this.getById(id);

    if (!order) throw 'Order not found';
    //handle no information being provided for a specified donation
    if (!Object.keys(orderUpdateInfo))
      throw `No information has been specified to update the specified order`;

    const updateInfo = await Order.findOneAndUpdate(
      { _id: id },
      { $set: orderUpdateInfo },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified order!';

    return await this.getById(id);
  },
};

module.exports = exportedMethods;
