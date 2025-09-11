'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('company_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            company: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            address1: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            address2: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            pincode: {
                type: Sequelize.STRING(255),
                allowNull: true,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('company_master');
    }
};