'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('modelmaster', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            manuf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            model_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            model_desc: {
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
        await queryInterface.dropTable('modelmaster');
    }
};