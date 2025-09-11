'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('published_reports', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            regno: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            remarks: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            file_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            edate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            bank_name: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bank_state: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            bank_city: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            report_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            report_url: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            publish_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            publish_time: {
                type: Sequelize.TIME,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('published_reports');
    }
};