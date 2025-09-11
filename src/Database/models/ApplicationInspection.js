const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const ApplicationsInspection = sequelize.define(
  "applications_inspection",
  {
    uid: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    application_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    inspection_comment: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    // Inspections 1–70 (title, reason, remark, status)
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const idx = i + 1;
        return [
          `ins_title${idx}`,
          { type: Sequelize.STRING(50), allowNull: true },
        ];
      })
    ),
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const idx = i + 1;
        return [
          `ins_reason${idx}`,
          { type: Sequelize.STRING(50), allowNull: true },
        ];
      })
    ),
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const idx = i + 1;
        return [
          `ins_remark${idx}`,
          { type: Sequelize.STRING(50), allowNull: true },
        ];
      })
    ),
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const idx = i + 1;
        return [
          `ins_status${idx}`,
          { type: Sequelize.STRING(1), allowNull: true },
        ];
      })
    ),
  },
  {
    collate: "utf8mb4_general_ci",
    timestamps: false,
    tableName: "applications_inspection",
  }
);

module.exports = ApplicationsInspection;
