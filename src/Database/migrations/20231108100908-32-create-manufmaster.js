'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('manufmaster', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            manuf_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            manuf_desc: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            vehicle_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('manufmaster');
    }
};