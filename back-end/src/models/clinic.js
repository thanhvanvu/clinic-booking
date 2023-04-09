'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.hasMany(models.DoctorInfo, {
        foreignKey: 'clinicId',
        as: 'clinicData',
      })

      Clinic.belongsTo(models.Allcode, {
        foreignKey: 'city',
        targetKey: 'keyMap',
        as: 'cityData',
      })
    }
  }
  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      image: DataTypes.BLOB('long'),
      logo: DataTypes.BLOB('long'),
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clinic',
    }
  )
  return Clinic
}
