'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('VRM_MASTER_INSPECTION_CHECKLIST', {
            UNIQUE_PARAM_ID: {
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
            PARAM_NAME: {
                type: Sequelize.STRING(128),
                allowNull: true,
            },
            RELATIVE_RANKING: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            PARAM_WEIGHT: {
                type: Sequelize.STRING(16),
                allowNull: true,
            },
            SUB_SYSTEM_ID: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            OPTIONAL: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            SORT_ORDER: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            VALUE_REQUIRED: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable('VRM_MASTER_INSPECTION_CHECKLIST');
    }
};