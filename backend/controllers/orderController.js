const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
};
