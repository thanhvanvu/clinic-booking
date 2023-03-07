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
      // 1 position has MANY user
      // the foreign key being defined in the target model USER
      Allcode.hasMany(models.User, {
        foreignKey: 'positionId',
        as: 'positionData',
      })

      // 1 gender has MANY user
      // the foreign key being defined in the target model USER
      Allcode.hasMany(models.User, {
        foreignKey: 'gender',
        as: 'genderData',
      })

      // 1 timeType has MANY schedule (allCode hasMany schedule)
      // the foreign key being defined in the target model Schedule
      Allcode.hasMany(models.Schedule, {
        foreignKey: 'timeType',
        as: 'timeTypeData',
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
