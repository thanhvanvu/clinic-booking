'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // add more data into databse
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Schedules', [
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-13', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-14', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-14', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-16', timeType: 'T1' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-16', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-16', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-16', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-16', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-17', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-17', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-18', timeType: 'T1' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-18', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-18', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-18', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-18', timeType: 'T8' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-19', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-19', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-20', timeType: 'T8' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-21', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-21', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-21', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-21', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-21', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T1' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-22', timeType: 'T8' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-23', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-23', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-23', timeType: 'T8' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-24', timeType: 'T2' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-24', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-24', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-24', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-25', timeType: 'T3' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-25', timeType: 'T4' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-25', timeType: 'T5' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-25', timeType: 'T6' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-25', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-26', timeType: 'T7' },
      { maxNumber: '10', doctorId: '107', date: '2023-3-28', timeType: 'T7' },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Schedules', null, {})
  },
}