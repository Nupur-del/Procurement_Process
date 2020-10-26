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
    order_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    item_id: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    reqName: {
       type: sequelize.STRING,
       allowNull: false
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
        type: sequelize.STRING,
        allowNull: false
    },
    purchase_type: {
        type: sequelize.STRING,
        allowNull: false
    },
    message: {
        type: sequelize.STRING,
        allowNull: false
    },
    currency: {
        type: sequelize.STRING,
        allowNull: false
    },
    org_billed: {
        type: sequelize.STRING,
        allowNull: false
    },
    cmp_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    location: {
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
    item_name: {
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
        type: sequelize.STRING,
        allowNull: true
    },
    message_client: {
        type: sequelize.STRING,
        allowNull: true
    },
    invoice_status: {
        type: sequelize.STRING,
        allowNull: true
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.INTEGER,
        allowNull: false
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
