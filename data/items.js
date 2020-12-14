const { Item, Order, Donation } = require('../models');

itemObject = (item) => {
  return {
    _id: item._id,
    quantity: item.quantity,
    recipient_id: item.recipient_id,
    order_id: item.order_id,
    donation_id: item.donation_id,
  };
};

let exportedMethods = {
  async getItem(recipientId, orderId, donationId) {
    if (!recipientId) throw 'You must provide an recipientId';
    if (typeof recipientId != 'string' || recipientId.trim().length === 0)
      throw 'You must provide a valid recipientId';

    if (!orderId) throw 'You must provide an orderId';
    if (typeof orderId != 'string' || orderId.trim().length === 0)
      throw 'You must provide a valid orderId';

    if (!donationId) throw 'You must provide an donationId';
    if (typeof donationId != 'string' || donationId.trim().length === 0)
      throw 'You must provide a valid donationId';

    const item = await Item.findOne({
      recipient_id: recipientId,
      order_id: orderId,
      donation_id: donationId,
    });

    if (!item) throw 'Item not found';
    return item;
  },

  async getByOrder(orderId) {
    if (!orderId) throw 'You must provide an orderId';
    if (typeof orderId != 'string' || orderId.trim().length === 0)
      throw 'You must provide a valid orderId';

    const items = await Item.find({ order_id: orderId });

    if (items.length === 0) throw 'Items are not added into the order';

    return items;
  },

  async updateQuantity(itemId, quantity) {
    if (!itemId) throw 'You must provide an itemId';
    if (typeof itemId != 'string' || itemId.trim().length === 0)
      throw 'You must provide a valid itemId';

    if (quantity === null || quantity === undefined)
      throw `No information has been specified to update the specified item`;

    if (isNaN(quantity)) throw 'Please specify positive value for quantity';

    let item = await this.getById(itemId);

    let donation = await Donation.findOne({ _id: item.donation_id });

    if (!donation) throw 'Donation not found';
    if (
      donation.status !== 'approved' ||
      donation.in_stock < item.quantity + quantity
    )
      throw 'Donation not available';

    if (item.quantity + quantity < 1) {
      // delete item when quantity is less than 1
      return this.delete(itemId);
    }

    let updateInfo = await Item.findOneAndUpdate(
      { _id: itemId },
      { $inc: { quantity: quantity } },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified item!';

    updateInfo = await Order.findOneAndUpdate(
      { _id: item.order_id },
      { $inc: { quantity: quantity } },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified order!';

    return await this.getById(itemId);
  },

  async getById(id) {
    if (!id) throw 'You must provide an id';
    if (typeof id != 'string' || id.trim().length === 0)
      throw 'You must provide a valid id';

    const item = await Item.findById(id);

    if (!item) throw 'item not found';
    return item;
  },

  async create(itemInfo) {
    this.validateItemInfo(itemInfo);

    let donation = await Donation.findOne({ _id: itemInfo.donation_id });

    if (!donation) throw 'Donation not found';
    if (donation.status !== 'approved' || donation.in_stock < itemInfo.quantity)
      throw 'Donation not available';

    let item = await Item.create({
      quantity: itemInfo.quantity,
      recipient_id: itemInfo.recipient_id,
      order_id: itemInfo.order_id,
      donation_id: itemInfo.donation_id,
    });

    if (!item) throw 'Trouble adding item into cart';

    const updateInfo = await Order.findOneAndUpdate(
      { _id: item.order_id },
      { $inc: { quantity: 1 }, $push: { items: item._id } },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified order!';

    return itemObject(item);
  },

  async delete(itemId) {
    let deletedItem = await Item.findOneAndDelete({ _id: itemId });

    const updateInfo = await Order.findOneAndUpdate(
      { _id: deletedItem.order_id },
      { $inc: { quantity: -1 }, $pull: { items: deletedItem._id } },
      { runValidators: true }
    );

    if (updateInfo.errors)
      throw 'Could not find and update the specified order!';
    return deletedItem;
  },

  validateItemInfo(item) {
    if (!item) throw 'Provide item details';
    if (!item.quantity && isNaN(item.quantity) && item.quantity < 1)
      throw 'You must provide a valid rating for your review';
  },
};

module.exports = exportedMethods;
