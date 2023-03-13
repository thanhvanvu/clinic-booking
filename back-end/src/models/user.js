'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1 User has ONLY 1 position
      // Foreinkey is defined in the source model USER
      User.belongsTo(models.Allcode, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData',
      })

      // 1 User has ONLY 1 gender
      // Foreinkey is defined in the source model USER
      User.belongsTo(models.Allcode, {
        foreignKey: 'gender',
        targetKey: 'keyMap',
        as: 'genderData',
      })

      // 1 doctor(user) has ONLY 1 markdown (detail information)
      // the foreign key being defined in the target model Markdown
      User.hasOne(models.Markdown, {
        foreignKey: 'doctorId',
      })

      // 1 doctor(user) has ONLY 1 clinic info)
      // the foreign key being defined in the target model doctorInfo
      User.hasOne(models.DoctorInfo, {
        foreignKey: 'doctorId',
      })
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
