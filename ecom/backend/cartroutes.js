const express = require("express");
const router = express.Router();
const verifyToken = require("./middleware/verification");
const Cart=require("./models/Cart")
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require("./cartcontroller");


router.get("/", verifyToken, getCart);



router.post("/add", verifyToken, addToCart);


router.put("/update", verifyToken, updateCartItem);


router.delete("/remove/:productId/:size", verifyToken, removeFromCart);


router.delete("/clear", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [] } }
    );
    res.status(200).json({ message: "Cart cleared." });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart." });
  }
});

module.exports = router;
