const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const ReportStatus = sequelize.define("report_status", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    status_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'report_status'
    });

module.exports = ReportStatus;