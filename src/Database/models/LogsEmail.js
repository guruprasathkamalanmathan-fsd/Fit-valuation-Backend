const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const LogsEmail = sequelize.define("logs_email",
{
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    edate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    etime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(500),
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'logs_email'
    });

module.exports = LogsEmail;