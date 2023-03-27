module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('DoctorInfos', 'specialistId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('DoctorInfos', 'specialistId'),
    ])
  },
}
