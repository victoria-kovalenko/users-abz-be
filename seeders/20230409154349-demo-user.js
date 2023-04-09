'use strict';

/** @type {import('sequelize-cli').Migration} */
const data = require('../data.json');

const preaperedData = data.map(d => {
  return {
    ...d,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', preaperedData, {});
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
