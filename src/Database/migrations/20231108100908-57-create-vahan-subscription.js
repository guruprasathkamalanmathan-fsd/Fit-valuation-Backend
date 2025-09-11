'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vahan_subscription', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            plan_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            credit: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            consumed: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vahan_subscription');
    }
};