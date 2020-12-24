const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'po_item',
  {
    id: {
     type: sequelize.TINYINT,
     autoIncrement: true,
     primaryKey: true
    },
    billNo: {
     type: sequelize.INTEGER,
     allowNull: false
    },
    order_id: {
     type: sequelize.INTEGER,
     allowNull: false
    },
    item_id: {
     type: sequelize.INTEGER,
     allowNull: false
    }
  },
  {
    timestamps: false    
  }
)
