const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String, // can be "S", "M", "L", "XL" or "7", "8", "9"
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["shoes", "clothing"], // helpful for frontend filtering
  },

  sizes: [sizeSchema], // 👈 NEW: size-wise stock

  image: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?q=80&w=700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?q=80&w=700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },

  rating: {
    type: Number,
    default: 0,
  },

  numReviews: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
