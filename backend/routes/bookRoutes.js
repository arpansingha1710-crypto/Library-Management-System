const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publicationYear
    } = req.body;

    if (
      !title ||
      !author ||
      !isbn ||
      !category ||
      !publicationYear
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const book = new Book({
      title,
      author,
      isbn,
      category,
      publicationYear
    });

    const savedBook = await book.save();

    // Success response
    res.status(201).json({
      message: "Book added successfully",
      book: savedBook
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;