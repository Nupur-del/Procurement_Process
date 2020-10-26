const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'order',
  {
    order_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    created_by: {
      type: sequelize.STRING,
      allowNull: false
    },
    date: {
       type: sequelize.DATE,
       allowNull: false
    },
    order_desc: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
