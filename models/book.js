module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {});
    
    return Book;
  };
  