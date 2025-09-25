const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const JobAssigned = sequelize.define(
  "job_assigned",
  {
    uid: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    vendor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    job_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    edate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    etime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    accept_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    accept_time: {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    is_assigned_for_this_job: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assigned_technician_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName:'job_assigned'
  }
);

module.exports = JobAssigned;
