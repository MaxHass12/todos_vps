const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/pg-db');

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'logs',
  }
);

// Log.sync({ alter: true });
Log.sync({});

module.exports = Log;
