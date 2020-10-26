const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'item',
  {
    item_id: {
     type: sequelize.BIGINT,
     autoIncrement: true,
     primaryKey: true
    },
    price: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    threshold: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
       type: sequelize.INTEGER,
       allowNull: false
    },
    discount: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    location: {
      type: sequelize.STRING,
      allowNull: false
    },
    name: {
       type: sequelize.STRING,
       allowNull: false
    },
    sku: {
        type: sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: sequelize.STRING,
        allowNull: false
    },
    features: {
        type: sequelize.STRING,
        allowNull: false
    },
    currency: {
        type: sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: sequelize.STRING,
        allowNull: false
    },
    warranty: {
        type: sequelize.STRING,
        allowNull: false
    },
    policy: {
        type: sequelize.STRING,
        allowNull: false
    },
  },
  {
    timestamps: false
  }
)
