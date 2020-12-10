const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'datalocation',
  {
    locLocationPK: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },
    locName: {
        type: sequelize.STRING,
        allowNull: false   
    },
    locShortName: {
       type: sequelize.STRING,
       allowNull: false
    },
    locCityFK: {
      type: sequelize.STRING,
      allowNull: false
    },
    locIsActive: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
