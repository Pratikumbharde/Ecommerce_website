const Cart = require("./models/Cart")
const Product = require("./models/Product")

exports.getCart = async (req, res) => {
  try {
    console.log("User in getCart:", req.user);
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ cart: { items: [] } });
    res.json({ cart });
  } catch (err) {
    console.error("getCart error:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    } else {
      // Remove any cart items with broken product refs
      cart.items = cart.items.filter(item => item.product);
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const qty = quantity || 1;

    // Find the specific size entry in the product's sizes array
    const sizeEntry = product.sizes.find(s => s.size === size);
    if (!sizeEntry) return res.status(400).json({ message: "Invalid size" });

    if (sizeEntry.stock < qty) {
      return res.status(400).json({ message: "Insufficient stock for selected size" });
    }

    // Check if item with same size already exists in cart
    const existingItem = cart.items.find(
      item => item.product._id.toString() === productId && item.size === size
    );

    if (existingItem) {
      // Update quantity if within available stock
      const totalQty = existingItem.quantity + qty;
      if (sizeEntry.stock < (totalQty - existingItem.quantity)) {
        return res.status(400).json({ message: "Not enough stock to update quantity" });
      }
      existingItem.quantity = totalQty;
    } else {
      cart.items.push({ product: productId, quantity: qty, size });
    }

    // Reduce size-specific stock from product
    sizeEntry.stock -= qty;
    product.markModified("sizes");

    await Promise.all([cart.save(), product.save()]);
    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};


exports.updateCartItem = async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product); // Clean broken refs

    const item = cart.items.find(
      (item) =>
        item.product &&
        item.product._id.toString() === productId &&
        item.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find the size entry in the product
    const sizeEntry = product.sizes.find(s => s.size === size);
    if (!sizeEntry) {
      return res.status(404).json({ message: `Size ${size} not available for this product.` });
    }

    const quantityDiff = quantity - item.quantity;

    if (quantityDiff > 0) {
      // Increase in cart quantity
      if (sizeEntry.stock < quantityDiff) {
        return res.status(400).json({ message: "Not enough stock available for this size" });
      }
      sizeEntry.stock -= quantityDiff;
    } else if (quantityDiff < 0) {
      // Decrease in cart quantity
      sizeEntry.stock += Math.abs(quantityDiff);
    }

    item.quantity = quantity;

    product.markModified("sizes");
    await Promise.all([cart.save(), product.save()]);

    res.status(200).json(cart);
  } catch (err) {
    console.error("Update cart item error:", err);
    res.status(500).json({ message: "Error updating cart item" });
  }
};


exports.removeFromCart = async (req, res) => {
  const { productId, size } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        item.product && // Avoid crashing on undefined
        !(item.product._id.toString() === productId && item.size === size)
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

