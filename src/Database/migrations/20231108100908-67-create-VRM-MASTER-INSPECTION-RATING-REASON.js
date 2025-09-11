'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('VRM_MASTER_INSPECTION_RATING_REASON', {
            UNIQUE_RATING_REASON_ID: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            INSPECTION_TYPE: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            CHECKLIST_TYPE_CODE: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            CHECKLIST_VERSION: {
                type: Sequelize.DECIMAL(3, 1),
                allowNull: true,
            },
            PARAM_CODE: {
                type: Sequelize.STRING(128),
                allowNull: true,
            },
            RATING_REASON_CODE: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            RATING_REASON_DESC: {
                type: Sequelize.STRING(128),
                allowNull: true,
            },
            ACTIVE: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            CREATED_BY: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            CREATED_DATE: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            UPDATED_BY: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            UPDATED_DATE: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('VRM_MASTER_INSPECTION_RATING_REASON');
    }
};