'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1 markdown (detail information) has ONLY 1 doctor.
      // the foreign key being defined in the source model Markdown
      Markdown.belongsTo(models.User, {
        foreignKey: 'doctorId',
      })
    }
  }
  Markdown.init(
    {
      contentHTML: DataTypes.TEXT('long'),
      contentMarkdown: DataTypes.TEXT('long'),
      description: DataTypes.TEXT('long'),
      doctorId: DataTypes.INTEGER,
      specialistId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Markdown',
    }
  )
  return Markdown
}
