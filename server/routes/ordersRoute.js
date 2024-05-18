const router = require('express').Router();
const Order = require('../models/orderModel');
const authMiddleware = require('../middlwares/authMiddleware');

// register order
router.post('/order-register', authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.send({
      success: true,
      message: 'Order create successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all orders
router.post('/get-all-orders', authMiddleware, async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filters = {};
    if (product) {
      filters.product = product;
    }
    if (seller) {
      filters.seller = seller;
    }
    const orders = await Order.find(filters)
      .populate('product')
      .populate('buyer')
      .populate('seller');
    res.send({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
