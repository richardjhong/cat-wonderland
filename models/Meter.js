const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Meter extends Model {}

Meter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },  
    gauge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cat',
        key: 'id'
      }
    }
  },
  {
    hooks: {
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meter',
  }
)

module.exports = Meter;