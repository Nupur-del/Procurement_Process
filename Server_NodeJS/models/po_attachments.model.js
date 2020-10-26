const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'po_attachment',
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
    attachments: {
       type: sequelize.STRING,
       allowNull: false
    }
  },
  {
    timestamps: false
  }
)
