'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sub_menu', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            menu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            submenu_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            shortcut_key: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('sub_menu');
    }
};