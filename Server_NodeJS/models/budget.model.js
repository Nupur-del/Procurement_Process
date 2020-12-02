const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'budget',
  {
    id: {
     type: sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    department: {
      type: sequelize.STRING,
      allowNull: false
    },
    location: {
      type: sequelize.STRING,
      allowNull: false
    },
    budget: {
       type: sequelize.INTEGER,
       allowNull: false
    },
    current_balance: {
        type: sequelize.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false
  }
)
