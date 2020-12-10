const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'order_item',
  {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    order_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    brand: {
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
    location: {
      type: sequelize.STRING,
      allowNull: true
    },
    department: {
      type: sequelize.INTEGER,
      allowNull: true
    },
    unit_type: {
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
      allowNull: true
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
