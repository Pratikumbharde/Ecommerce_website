// routes/orderRoutes.js
const express = require("express");
const router  = express.Router();
const Cart    = require("./models/Cart");
const Order   = require("./models/Order");
const verifyToken = require("./middleware/verification");

// POST  /orders/create  ➜ returns order + total
router.post("/create", verifyToken, async (req, res) => {
  try {
    // 1️⃣  Get the user’s cart (with product data)
    const cart = await Cart.findOne({ user: req.user._id })
                           .populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣  Build order items + total
    const orderItems = cart.items.map((i) => ({
      product : i.product._id,
      size    : i.size,
      quantity: i.quantity,
      price   : i.product.price
    }));
    const total = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // 3️⃣  Create order with status = pending
    const order = await Order.create({
      user   : req.user._id,
      items  : orderItems,
      total,
      status : "pending",
      paymentMethod: "mock"
    });

    // 4️⃣  Return order so frontend can show bill
    res.status(201).json({
      orderId : order._id,
      total,
      items   : orderItems.map(i => ({
        name    : i.product.name, // product already populated
        size    : i.size,
        quantity: i.quantity,
        price   : i.price
      }))
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});


router.post("/orders/confirm-payment", async (req, res) => {
  const { orderId, success } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = success ? "paid" : "failed";
    await order.save();

    res.json({ message: "Payment status updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
