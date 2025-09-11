'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('state_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            state_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            remarks: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            zone: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('state_master');
    }
};