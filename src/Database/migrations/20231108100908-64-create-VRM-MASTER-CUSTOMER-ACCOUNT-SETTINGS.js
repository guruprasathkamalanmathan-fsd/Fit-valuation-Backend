'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('VRM_MASTER_CUSTOMER_ACCOUNT_SETTINGS', {
            CUSTOMER_ACCOUNT_SETTINGS_ID: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            CUSTOMER_ACCOUNT_ID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            SETTING_TYPE: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            SETTING_VALUE: {
                type: Sequelize.STRING(128),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('VRM_MASTER_CUSTOMER_ACCOUNT_SETTINGS');
    }
};