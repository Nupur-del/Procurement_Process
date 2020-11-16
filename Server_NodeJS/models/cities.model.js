const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'cities',
  {
    id: {
     type: sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    location: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
