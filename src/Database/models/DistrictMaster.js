const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const DistrictMaster = sequelize.define(
  "district_master",
  {
    uid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    district_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName:'district_master'
  }
);

module.exports = DistrictMaster;
