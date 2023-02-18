'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1 table allcode is belonged to many user
      Allcode.hasMany(models.User, {
        foreignKey: 'positionId',
        as: 'positionData',
      })
      Allcode.hasMany(models.User, {
        foreignKey: 'gender',
        as: 'genderData',
      })
    }
  }
  Allcode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEN: DataTypes.STRING,
      valueVI: DataTypes.STRING,
      valueES: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Allcode',
    }
  )
  return Allcode
}
