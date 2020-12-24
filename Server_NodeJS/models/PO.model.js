const sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
  'po',
  {
    billNo: {
     type: sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
    },
    urg_msg: {
        type: sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: sequelize.STRING,
        allowNull: false
    },
    behalf: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    purchase_type: {
        type: sequelize.STRING,
        allowNull: false
    },
    currency: {
        type: sequelize.STRING,
        allowNull: false
    },
    cmp_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    bill_to_address: {
        type: sequelize.STRING,
        allowNull: false
    },
    delivery_to: {
        type: sequelize.STRING,
        allowNull: false
    },
    required_by: {
        type: sequelize.STRING,
        allowNull: false
    },
    delivery_address: {
        type: sequelize.STRING,
        allowNull: false
    },
    cost_center: {
        type: sequelize.STRING,
        allowNull: false
    },
    project_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    budget_code: {
        type: sequelize.STRING,
        allowNull: false
    },
    tracking_link: {
        type: sequelize.STRING,
        allowNull: true
    },
    estimated_arrival: {
        type: sequelize.DATE,
        allowNull: true
    },
    po_status: {
        type: sequelize.TINYINT,
        allowNull: true
    },
    supplier: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    location: {
        type: sequelize.STRING,
        allowNull: false
    },
    message_client: {
        type: sequelize.STRING,
        allowNull: true
    },
    invoice_status: {
        type: sequelize.STRING,
        allowNull: true
    },
    total: {
        type: sequelize.INTEGER,
        allowNull: false
    },
  },
  {
    timestamps: false
  }
)
