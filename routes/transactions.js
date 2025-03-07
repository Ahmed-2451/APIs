const express = require('express');
const router = express.Router();
const { Book } = require('../models');

router.post('/borrow/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    if (book.status === 'unavailable') {
      return res.status(400).send('Book already borrowed');
    }

    await book.update({ status: 'unavailable' });
    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).send('Error borrowing book');
  }
});

router.post('/return/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    if (book.status === 'available') {
      return res.status(400).send('Book is not borrowed');
    }

    await book.update({ status: 'available' });
    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).send('Error returning book');
  }
});

module.exports = router;
