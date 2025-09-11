'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('customer_process', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            process_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            process_fee: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('customer_process');
    }
};