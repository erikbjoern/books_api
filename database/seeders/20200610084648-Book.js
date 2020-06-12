"use strict";

const models = require('../../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Authors", [
      {
        name: "Juan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])

    const authors = await models.Author.findAll()

    await queryInterface.bulkInsert("Books", [
      {
        title: "Really Nice Book",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: authors[0].id
      },
      {
        title: "Really Fine Book",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: authors[1].id
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {})
    await queryInterface.bulkDelete("Authors", null, {})
  },
};
