const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      };
    }
    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    
    if (!title || !author || !description || !price) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newBook = new Book({
      title,
      author,
      description,
      price
    });

    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.price = price !== undefined ? price : book.price;

    book = await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ message: 'Book removed successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
