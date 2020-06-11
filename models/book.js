"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "You need to set a title!" },
        },
      },
    },
    {}
  );
  Book.associate = models =>  {
    Book.belongsTo(models.Author)
  };
  return Book;
};
