const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const RoleMaster = sequelize.define("role_master", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    rolename: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    short_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'role_master'
    });

module.exports = RoleMaster;