const { Sequelize } = require("sequelize");
const { sequelize } = require("../db");

const VahanHitCount = sequelize.define("vahan_hit_counts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    vahan_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    hit_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usermaster', // The name of the target table
            key: 'uid',      // The name of the target column
        },
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    // updated_at: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    // },
},
    {
        collate: 'utf8mb4_general_ci',
        timestamps: false,
        tableName: 'vahan_hit_counts'
    });

module.exports = VahanHitCount;