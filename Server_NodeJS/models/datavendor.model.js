const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'datavendor',
  {
    venVendorPK: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },
    venName: {
        type: sequelize.STRING,
        allowNull: false   
    },
    venAbbrName: {
        type: sequelize.STRING,
        allowNull: false
    },
    venYearOfEst: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    venAffliationWithTcs: {
        type: sequelize.DATE,
        allowNull: true
    },
    venRegistrationNo: {
      type: sequelize.STRING,
      allowNull: false
    },
    venLicenceNo: {
      type: sequelize.STRING,
      allowNull: false
    },
    venBussinessLogo: {
      type: sequelize.BLOB,
      allowNull: true
    },
    venIsActive: {
      type: sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
