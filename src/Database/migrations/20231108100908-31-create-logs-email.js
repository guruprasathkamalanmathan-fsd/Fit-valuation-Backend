'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('logs_email', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            edate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            etime: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('logs_email');
    }
};