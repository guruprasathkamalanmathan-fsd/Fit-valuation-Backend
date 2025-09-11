const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const BankMaster = sequelize.define(
  "bank_master",
{
  uid: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  bank_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  remarks: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  bank_logo: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  bank_type: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  payment_mode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  process_and_fee: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  domain_name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
},
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName: "bank_master",
  }
);

module.exports = BankMaster;
