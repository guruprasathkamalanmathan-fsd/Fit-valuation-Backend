const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const StateMaster = sequelize.define("state_master", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    state_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    remarks: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    zone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:"state_master",
    });

module.exports = StateMaster;