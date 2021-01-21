const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'venCategory',
  {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: sequelize.STRING,
        allowNull: false
    },
    suppRegNo: {
        type: sequelize.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
