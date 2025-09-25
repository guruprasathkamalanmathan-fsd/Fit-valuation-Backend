const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const InsuranceCompanyMaster = sequelize.define(
  "insurance_company_master",
  {
    uid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    company: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName:'insurance_company_master'
  }
);

module.exports = InsuranceCompanyMaster;
