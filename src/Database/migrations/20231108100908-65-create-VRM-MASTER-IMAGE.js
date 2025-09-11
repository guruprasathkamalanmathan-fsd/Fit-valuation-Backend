'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('VRM_MASTER_IMAGE', {
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
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('VRM_MASTER_IMAGE');
    }
};