const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'department',
  {
    id: {
     type: sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    department_name: {
       type: sequelize.STRING,
       allowNull: false
    }
  },
  {
    timestamps: false
  }
)
