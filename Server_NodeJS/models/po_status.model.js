const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'po_statu',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    billNo: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    status: {
       type: sequelize.STRING,
       allowNull: true
    },
    order_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
  },
  {
    timestamps: false
  }
)
