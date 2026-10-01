const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Library Book Management API is running");
});



app.post("/api/books", async (req, res) => {

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



    res.status(201).json({
      message: "Book created successfully",
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


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {

      console.log(
        `Server running on http://localhost:${process.env.PORT}`
      );

    });

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error
    );

  });