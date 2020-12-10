const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'adminaccess',
  {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },
    admintype: {
        type: sequelize.TINYINT,
        allowNull: false   
    },
    adminid: {
        type: sequelize.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
