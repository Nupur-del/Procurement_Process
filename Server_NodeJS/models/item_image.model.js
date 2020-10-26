const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'item_image',
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
    imageName: [
        {
       type: sequelize.STRING,
       allowNull: false
       }
    ],
  },
  {
    timestamps: false
  }
)
