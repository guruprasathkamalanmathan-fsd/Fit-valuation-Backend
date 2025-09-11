'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('VRM_MASTER_INSURANCE_COMPANY', {
            INSURANCE_COMPANY_ID: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            INSURANCE_COMPANY_NAME: {
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
        await queryInterface.dropTable('VRM_MASTER_INSURANCE_COMPANY');
    }
};