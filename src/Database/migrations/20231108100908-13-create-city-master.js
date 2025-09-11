'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('city_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            city_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            state_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            district_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            pincode: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            remarks: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('city_master');
    }
};