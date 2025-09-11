'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vendor_area', {
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
            state_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            city_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            pincode: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            additional_fee: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vendor_area');
    }
};