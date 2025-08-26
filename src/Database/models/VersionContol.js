const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const VersionControl = sequelize.define("version_control", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    project_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    version_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    version_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'version_control'
    });

module.exports = VersionControl;