'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vahan_counter', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            counter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vahan_counter');
    }
};