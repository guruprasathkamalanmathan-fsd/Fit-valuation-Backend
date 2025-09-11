'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('job_notes', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            template: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            remarks: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            created_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            created_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            job_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_username: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            other_detail: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('job_notes');
    }
};