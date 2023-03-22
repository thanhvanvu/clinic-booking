'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Specialists', {
      // title: DataTypes.STRING,
      // descriptionHTML: DataTypes.TEXT('long'),
      // descriptionMarkdown: DataTypes.TEXT('long'),
      // image: DataTypes.BLOB('long'),
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tittle: {
        type: Sequelize.TEXT,
      },
      descriptionHTML: {
        type: Sequelize.TEXT('long'),
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT('long'),
      },
      image: {
        type: Sequelize.BLOB('long'),
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
    await queryInterface.dropTable('Specialists')
  },
}
