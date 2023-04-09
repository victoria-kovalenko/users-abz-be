'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Positions extends Model {
    static associate(models) {
      Positions.hasOne(models.Users, {
        as: 'user',
        foreignKey: 'position_id'
      })
    }
  }
  Positions.init({
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Positions',
  });
  return Positions;
};