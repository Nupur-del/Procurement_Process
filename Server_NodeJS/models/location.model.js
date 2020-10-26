const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'location',
  {
    id: {
     type: sequelize.BIGINT,
     autoIncrement: true,
     primaryKey: true
    },
    order_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    location: {
      type: sequelize.STRING,
      allowNull: false
    },
    department: {
       type: sequelize.STRING,
       allowNull: false
    }
  },
  {
    timestamps: false
  }
)
