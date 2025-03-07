const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('library', 'postgres', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres', 
  logging: false, 
});



(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
