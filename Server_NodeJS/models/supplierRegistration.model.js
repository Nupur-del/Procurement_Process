const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'supplierRegisterationData',
  {   
      id: {
          type: sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      company_name: {
        type: sequelize.STRING,
        allowNull: false
      },
      yearofest: {
        type: sequelize.STRING,
        allowNull: false
      },
      licenseno: {
        type: sequelize.STRING,
        allowNull: false
      },
      country: {
        type: sequelize.STRING,
        allowNull: false
      },
      name: {
        type: sequelize.STRING,
        allowNull: false
      },
      email: {
        type: sequelize.STRING,
        allowNull: false
      },
      password: {
        type: sequelize.STRING,
        allowNull: false
      },
      mobile: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      fax: {
        type: sequelize.STRING,
        allowNull: false
      },
      tax: {
        type: sequelize.STRING,
        allowNull: false
      },
      ques: {
        type: sequelize.STRING,
        allowNull: false
      },
      ans: {
        type: sequelize.STRING,
        allowNull: false
      },
      lang: {
        type: sequelize.STRING,
        allowNull: false
      },
      acceptTerms: {
        type: sequelize.BOOLEAN,
        allowNull: false
      },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
    isviewed: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    state: {
        type: sequelize.STRING,
        allowNull: false
    },
    postalCode: {
        type: sequelize.STRING,
        allowNull: false
    },
    token: {
        type: sequelize.STRING,
        allowNull: true
    },
    website: {
        type: sequelize.STRING,
        allowNull: true
    },
    address:{
     type: sequelize.STRING,
     allowNull: false
    },
    isapproved: {
      type: sequelize.BOOLEAN,
      allowNull: false
    },
    isVerified: {
      type: sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
