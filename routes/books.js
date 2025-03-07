const express = require('express');
const router = express.Router();
const { Book } = require('../models'); 
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books); 
  } catch (error) {
    console.error('Error fetching books:', error.message); 
    res.status(500).json({ message: 'Error fetching books' }); 
  }
});


router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send('Error creating book');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).send('Error updating book');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    await book.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting book');
  }
});

module.exports = router;
