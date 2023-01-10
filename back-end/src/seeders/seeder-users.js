'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // add more data into databse
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'Thanh',
        lastName: 'Vu',
        address: '9911 Marisa Alexis Dr',
        phoneNumber: '2815478456',
        gender: 1,
        typeRole: 'ROLE',
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
