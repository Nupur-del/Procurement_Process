const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'admintype',
  {
    admintypeid: {
        type: sequelize.TINYINT,
        autoIncrement: true,
        primaryKey: true
       },
    admintype: {
        type: sequelize.STRING,
        allowNull: false   
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
