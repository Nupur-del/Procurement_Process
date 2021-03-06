const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'orderstatus',
  {
    id: {
        type: sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },  
    orderStatus: {
      type: sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
