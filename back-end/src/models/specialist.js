'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Specialist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Specialist.hasMany(models.DoctorInfo, {
        foreignKey: 'specialistId',
        as: 'specialistData',
      })
    }
  }
  Specialist.init(
    {
      tittle: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT('long'),
      descriptionMarkdown: DataTypes.TEXT('long'),
      image: DataTypes.BLOB('long'),
    },
    {
      sequelize,
      modelName: 'Specialist',
    }
  )
  return Specialist
}
