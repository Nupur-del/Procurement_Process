const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'datavendorinfo',
  {
    vendorPK: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
       },
    vendorpwd: {
        type: sequelize.STRING,
        allowNull: false   
    },
    vendorSecretQn: {
      type: sequelize.STRING,
      allowNull: false
    },
    vendorSecretAns: {
       type: sequelize.STRING,
       allowNull: false
    },
    vendorOffLandLineNo: {
        type: sequelize.STRING,
        allowNull: false
    },
    vendorMobileNo: {
        type: sequelize.STRING,
        allowNull: true
    },
    vendorFaxNo: {
        type: sequelize.STRING,
        allowNull: true
    },
    vendorEmail: {
        type: sequelize.STRING,
        allowNull: false
    },
    vendorVoIP: {
        type: sequelize.STRING,
        allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
