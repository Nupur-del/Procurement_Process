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
      allowNull: false
    },
    invoice_no: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    market_price: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    invoiced_quantity: {
     type: sequelize.INTEGER,
     allowNull: false
    },
     Total_Price: {
        type: sequelize.INTEGER,
        allowNull: false
     }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
