module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    published_year: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'available',
    },
  });

  return Book;
};
