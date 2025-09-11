'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('battery_master_versions', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            battery: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            master_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            date_created: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            time_created: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            created_by_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('battery_master_versions');
    }
};