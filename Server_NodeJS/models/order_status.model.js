const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'order_statu',
  {
    id: {
        type: sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },  
    order_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: sequelize.STRING,
      allowNull: false
    },
    message: {
       type: sequelize.STRING,
       allowNull: false
    }
  },
  {
    timestamps: false
  }
)
