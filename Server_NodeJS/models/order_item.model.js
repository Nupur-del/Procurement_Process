const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'order_item',
  {
    id:{
        type: sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },  
    order_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    unit_type: {
        type: sequelize.STRING,
        allowNull: false
    },
    custom: {
        type: sequelize.STRING,
        allowNull: true
    },
    comment: {
        type: sequelize.STRING,
        allowNull: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    specification: {
      type: sequelize.STRING,
      allowNull: false
    },
    prefered_vendor: {
       type: sequelize.STRING,
       allowNull: false
    },
    currency: {
        type: sequelize.STRING,
        allowNull: false
     },
     status: {
        type: sequelize.STRING,
        allowNull: true
    },
    estimated_arrival: {
        type: sequelize.DATE,
        allowNull: true
    },
    tracking_link:{
        type: sequelize.STRING,
        allowNull: true
    }
  },
  {
    timestamps: false
  }
)
