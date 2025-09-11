'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vahan_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            api_data: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            vehicle_no: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            ip: {
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
            },
            audit: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            api_source: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            complition_status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vahan_master');
    }
};