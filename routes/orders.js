const express = require('express');
const router = express.Router();
const data = require('../data');
const orderData = data.orders;
const itemData = data.items;
const donationData = data.donations;
const { Role } = require('../models');
const authMiddlewares = require('../middlewares/auth');

// TODO: add item by updating quantity
// TODO: add validation to check in_stock quantity of donation before adding item into a cart - done
// TODO: update order everytime item get added or deleted - done

router.get('/', async (req, res) => {
  try {
    let orders = await orderData.getAllOrders();
    res.status(200).render('orders/index', {
      title: 'My Orders',
      orders: orders,
      message: req.flash(),
    });
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

router.get('/:id', async (req, res) => {
  let orderId = req.params.id;
  let order;
  try {
    order = await orderData.getById(orderId);
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  try {
    let items = [];

    if (order.quantity > 0) {
      items = await itemData.getByOrder(order._id);

      // populate donations with items
      for (let i = 0; i < items.length; i++) {
        items[i].donation = await donationData.getById(items[i].donation_id);
      }
    }
    res.status(200).render('orders/show', {
      title: 'My Orders',
      items: items,
      order: order,
      pageName: 'Order Details',
      showPlaceOrderBtn: order.status === 'draft' && order.quantity > 0,
    });
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

router.get('/:id/checkout', async (req, res) => {
  let id = req.params.id;
  let order;

  try {
    order = await orderData.getById(id);
  } catch (error) {
    res.status(404).render('customError', {
      title: 'Not found',
      errorReason: error,
      pageName: 'Error',
    });
  }

  try {
    if (order.quantity < 1) {
      req.flash('danger', "You don't have any items in your cart.");
      res.redirect(`/orders/${order._id}`);
    }

    let updatedObject = { status: 'placed' };
    let updatedOrder = await orderData.updateOrder(id, updatedObject);

    // update in_stock quantity here for donation
    let items = order.items;
    let item;
    for (let i = 0; i < items.length; i++) {
      item = await itemData.getById(items[i]);
      let donation = await donationData.getById(item.donation_id);

      // if in-stock is not sufficient, it only adds available quantity in the order
      let in_stock_items =
        donation.in_stock >= item.quantity
          ? donation.in_stock - item.quantity
          : donation.in_stock;
      await donationData.updateDonation(
        item.donation_id,
        { in_stock: in_stock_items },
        true
      );
    }

    if (updatedOrder) {
      req.session.user.order = {}; // Remove placed order from session
      req.flash('info', `Congratulations! Your order is placed successfully.`);
      res.redirect(`/orders/${order._id}`);
    }
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    res.status(500).render('customError', {
      title: 'Internal Server Error',
      pageName: 'Error',
      errorReason: 'Please contact administrator of the site for more details.',
    });
  }
});

module.exports = router;
