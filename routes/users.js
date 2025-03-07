const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send('User not found');
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;
