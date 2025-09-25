const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Review = require("../models/Review");
const auth = require("../middleware/auth");

// Add a new book
router.post("/", auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all books (pagination + filters)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    let filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get book by ID with reviews
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) return res.status(404).json({ error: "Book not found" });

    const avgRating =
      book.reviews.length > 0
        ? book.reviews.reduce((a, r) => a + r.rating, 0) / book.reviews.length
        : 0;

    res.json({ book, avgRating });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
