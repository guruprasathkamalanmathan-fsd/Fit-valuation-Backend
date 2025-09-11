'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sw_settings', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            top_header: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            nav_bar: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            left_bar: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            left_bar_i: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            default_setting: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            unit_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            load_counter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sw_settings');
    }
};