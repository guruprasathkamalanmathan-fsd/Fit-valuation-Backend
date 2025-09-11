'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('executive_master_versions', {
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
            },
            master_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            date_created: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            time_created: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            created_by_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('executive_master_versions');
    }
};