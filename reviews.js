const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

// Add a review (one per user per book)
router.post("/:bookId", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.bookId;

    const existingReview = await Review.findOne({
      book: bookId,
      user: req.user.id,
    });

    if (existingReview)
      return res.status(400).json({ error: "You already reviewed this book" });

    const review = new Review({
      book: bookId,
      user: req.user.id,
      rating,
      comment,
    });

    await review.save();
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update your review
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete your review
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
