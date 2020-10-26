const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'login',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: sequelize.STRING
    },
    password: {
       type: sequelize.STRING
    },
    type: {
      type: sequelize.STRING
    }
  },
  {
    timestamps: false
  }
)
