const express = require("express");
const router = express.Router();
const Review = require("./models/Review");
const verifyToken = require("./middleware/verification");
const Product = require("./models/Product");

// GET all reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
    .sort({ createdAt: -1 })
    .populate("user", "username"); 
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});



router.post("/:productId", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    const review = new Review({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    await review.save();

    // Fetch all reviews for the product
    const allReviews = await Review.find({ product: productId });

    const numReviews = allReviews.length;
    const avgRating =
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) / numReviews;

    // Update product's rating and numReviews
    await Product.findByIdAndUpdate(productId, {
      rating: avgRating,
      numReviews: numReviews,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit review" });
  }
});


// DELETE a review by its ID
router.delete("/:reviewId", verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = router;
