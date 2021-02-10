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
        allowNull: true
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
    },
    venVendorFK: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    venaddress:{
      type: sequelize.STRING,
      allowNull: false
    },
    vencity: {
      type: sequelize.STRING,
      allowNull: false
    },
    venstate: {
      type: sequelize.STRING,
      allowNull: false
    },
    venisapproved: {
      type: sequelize.STRING,
      allowNull: false
    },
    venisViewed: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    venpostalCode: {
      type: sequelize.STRING,
      allowNull: false
    },
    venperson: {
      type: sequelize.STRING,
      allowNull: false
    },
    ventax: {
      type: sequelize.STRING,
      allowNull: false
    },
    ventoken: {
      type: sequelize.STRING,
      allowNull: false
    },
    venisVerified: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    vencountry: {
      type: sequelize.STRING,
      allowNull: false
    },
    venwebsite: {
      type: sequelize.STRING,
      allowNull: true
    },
    venlang: {
      type: sequelize.STRING,
      allowNull: false
    },
    venacceptTerms: {
      type: sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
