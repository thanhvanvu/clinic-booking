'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DoctorInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contentHTML: {
        type: Sequelize.TEXT('long'),
      },
      contentMarkdown: {
        type: Sequelize.TEXT('long'),
      },
      description: {
        type: Sequelize.TEXT('long'),
      },
      specialistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      clinicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DoctorInfos')
  },
}
