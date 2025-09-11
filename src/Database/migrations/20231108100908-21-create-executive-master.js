'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('executive_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            exe_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            mobile_no: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            fees: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('executive_master');
    }
};