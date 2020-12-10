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
      type: sequelize.INTEGER,
      allowNull: false
    },
    location: {
      type: sequelize.STRING,
      allowNull: false
    },
    budget: {
       type: sequelize.BIGINT,
       allowNull: false
    },
    current_balance: {
        type: sequelize.BIGINT,
        allowNull: false
    }
  },
  {
    timestamps: false
  }
)
