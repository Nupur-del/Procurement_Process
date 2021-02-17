const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'invoice',
  {
    invoice_no: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    billNo: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    invoice_date: {
        type: sequelize.DATE,
        allowNull: true
     },
     invoice_due_date: {
        type: sequelize.DATE,
        allowNull: true
     },
     credit_days: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     invoice_address: {
        type: sequelize.STRING,
        allowNull: false
     },
     description: {
        type: sequelize.STRING,
        allowNull: false
     },
     tax: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     total: {
        type: sequelize.INTEGER,
        allowNull: false
     }
  },
  {
    timestamps: false
  }
)
