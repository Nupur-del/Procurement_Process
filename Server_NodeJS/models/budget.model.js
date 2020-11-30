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
    location: {
      type: sequelize.STRING,
      allowNull: false
    },
    approx_remaining_budget: {
      type: sequelize.BIGINT,
      allowNull: false
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
