'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('job_assigned', {
            uid: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            vendor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            job_id: {
                type: Sequelize.INTEGER,
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
            accept_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            accept_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            is_assigned_for_this_job: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            assigned_technician_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('job_assigned');
    }
};