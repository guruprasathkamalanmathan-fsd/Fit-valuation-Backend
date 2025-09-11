'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('client_api_auth_key', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            user_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            auth_key: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            edate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            etime: {
                type: Sequelize.TIME,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('client_api_auth_key');
    }
};