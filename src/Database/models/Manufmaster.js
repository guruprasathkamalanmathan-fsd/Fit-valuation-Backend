const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Manufmaster = sequelize.define("manufmaster", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    manuf_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    manuf_desc: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    vehicle_type: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'manufmaster'
    });

module.exports = Manufmaster;