const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'dataadmin',
  {
    admAdminPK: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admName: {
      type: sequelize.STRING,
      allowNull: false
    },
    admDOJ:{
      type: sequelize.DATE,
      allowNull: false
    },
    admIsActive: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    admpwd: {
       type: sequelize.STRING,
       allowNull: false
    },
    admSecretQn: {
      type: sequelize.STRING,
      allowNull: false
    },
    admSecretAns: {
      type: sequelize.STRING,
      allowNull: false
    },
    admOffLandLineNo: {
      type: sequelize.STRING,
      allowNull: false
    },
    admMobileNo: {
      type: sequelize.STRING
    },
    admFaxNo: {
      type: sequelize.STRING
    },
    admEmail: {
      type: sequelize.STRING,
      allowNull: false
    },
    admVoIP: {
      type: sequelize.STRING
    },
    admPhotoURL: {
      type: sequelize.STRING
    },
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
