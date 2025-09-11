'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('process_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            process_type_code: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            process_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            vehicle_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('process_master');
    }
};