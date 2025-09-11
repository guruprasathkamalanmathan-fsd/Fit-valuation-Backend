'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vendor_process', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            vendor_id: {
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
            },
            repo: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vendor_process');
    }
};