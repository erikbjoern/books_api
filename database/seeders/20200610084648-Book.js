"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Books", [
      {
        title: "Really Nice Book",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Really Fine Book",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Books", null, {})
  },
};
