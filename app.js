const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

const sequelize = new Sequelize('library', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const Book = require('./models/book')(sequelize, DataTypes);

// Middleware
app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
    
    return sequelize.sync({ force: true }); // force: true will recreate the table every time the app starts
  })
  .then(async () => {
    await Book.bulkCreate([
      { title: 'Attack on titan', author: 'isyama', genre: 'anime', published_year: 2008 },
      { title: 'game of thrones', author: 'george r martin', genre: 'fiction', published_year: 2011 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', published_year: 1925 },
      { title: 'Bleach', author: 'Tite Kubo', genre: 'anime', published_year: 2003 },
      { title: 'harry potter', author: 'j k rowling', genre: 'Adventure', published_year: 1954 }
    ]);
    console.log('Initial books data seeded');
  })
  .catch(err => console.error('PostgreSQL connection error:', err));


// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).send('Error fetching books');
  }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (err) {
    res.status(500).send('Error fetching book');
  }
});

// Create a new book
app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send('Error creating book');
  }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    
    await book.update(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).send('Error updating book');
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    
    await book.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting book');
  }
});

// Start the server
const port = 3000;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
