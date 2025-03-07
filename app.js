const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');

const sequelize = new Sequelize('library', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log 
});


app.use(express.json());

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader === 'Bearer ZEWAIL') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

app.use(verifyAuth);

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => console.error('PostgreSQL connection error:', err));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
