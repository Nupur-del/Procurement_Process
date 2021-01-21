const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'datacategory',
  {
    catCategoryPK: {
        type: sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    catName: {
        type: sequelize.STRING,
        allowNull: false
    },
    catIsActive: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
