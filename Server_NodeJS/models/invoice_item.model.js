const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'invoice_item',
  {
    id: {
      type: sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true
    },
    item_id: {
      type: sequelize.INTEGER,
      allowNull: true
    },
    invoice_no: {
      type: sequelize.INTEGER,
      allowNull: true
    },
    market_price: {
      type: sequelize.INTEGER,
      allowNull: true
    },
    invoiced_quantity: {
     type: sequelize.INTEGER,
     allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
