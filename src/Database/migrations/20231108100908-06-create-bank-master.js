'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bank_master', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            bank_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            remarks: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            bank_logo: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            bank_type: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            payment_mode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            process_and_fee: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            domain_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bank_master');
    }
};