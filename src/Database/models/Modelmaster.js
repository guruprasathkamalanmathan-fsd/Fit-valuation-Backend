const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const Modelmaster = sequelize.define("modelmaster", {
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    manuf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    model_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    model_desc: {
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
        tableName:'modelmaster'
    });

module.exports = Modelmaster;