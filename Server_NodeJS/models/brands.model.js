const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'brands',
  {
    brandpk: {
     type: sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    brandName: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
