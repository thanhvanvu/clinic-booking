'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 doctorInfo has ONLY 1 doctor.
      // the foreign key being defined in the source model Markdown
      DoctorInfo.belongsTo(models.User, {
        foreignKey: 'doctorId',
      })

      // 1 row doctorInfo has ONLY 1 city
      // Foreinkey is defined in the source model Schedule
      DoctorInfo.belongsTo(models.Allcode, {
        foreignKey: 'cityId',
        targetKey: 'keyMap',
        as: 'cityData',
      })

      // 1 row doctorInfo has ONLY 1 price
      // Foreinkey is defined in the source model Schedule
      DoctorInfo.belongsTo(models.Allcode, {
        foreignKey: 'priceId',
        targetKey: 'keyMap',
        as: 'priceData',
      })

      // 1 row doctorInfo has ONLY 1 payment
      // Foreinkey is defined in the source model Schedule
      DoctorInfo.belongsTo(models.Allcode, {
        foreignKey: 'paymentId',
        targetKey: 'keyMap',
        as: 'paymentData',
      })
    }
  }
  DoctorInfo.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      cityId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DoctorInfo',
    }
  )
  return DoctorInfo
}
