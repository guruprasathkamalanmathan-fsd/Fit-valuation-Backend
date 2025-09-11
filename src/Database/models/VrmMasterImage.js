const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const VrmMasterImage = sequelize.define("VRM_MASTER_IMAGE", {
    IMAGE_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    IMAGE_NAME: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
    MANDATORY: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    VEHICLE_TYPE: {
        type: Sequelize.STRING(16),
        allowNull: false,
    },
    ICON_URL: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
    MAX_COUNT: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    FILE_NAME: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName:'VRM_MASTER_IMAGE'
    });

module.exports = VrmMasterImage;