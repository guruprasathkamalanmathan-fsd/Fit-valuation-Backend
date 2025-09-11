const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const CityMaster = sequelize.define(
  "city_master",
  {
    uid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    city_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    district_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pincode: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    remarks: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName:"city_master",
  }
);

module.exports = CityMaster;
