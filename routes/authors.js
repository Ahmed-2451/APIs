const express = require('express');
const router = express.Router();
const { Author } = require('../models');

router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (err) {
    res.status(500).send('Error fetching authors');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    res.json(author);
  } catch (err) {
    res.status(500).send('Error fetching author');
  }
});

router.post('/', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).send('Error creating author');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    await author.update(req.body);
    res.json(author);
  } catch (err) {
    res.status(500).send('Error updating author');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    await author.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting author');
  }
});

module.exports = router;
