const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const ProcessMaster = sequelize.define("process_master", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    process_type_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    process_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    vehicle_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'process_master'
    });

module.exports = ProcessMaster;