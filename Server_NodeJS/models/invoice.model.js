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
    item_id: {
       type: sequelize.INTEGER,
       allowNull: false
    },
    invoice_date: {
        type: sequelize.DATE,
        allowNull: false
     },
     invoice_due_date: {
        type: sequelize.DATE,
        allowNull: false
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
     item_name: {
        type: sequelize.STRING,
        allowNull: false
     },
     market_price: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     unit_price: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     ordered_quantity: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     invoiced_quantity: {
        type: sequelize.INTEGER,
        allowNull: false
     },
     tax: {
        type: sequelize.INTEGER,
        allowNull: false
     },
  },
  {
    timestamps: false
  }
)
