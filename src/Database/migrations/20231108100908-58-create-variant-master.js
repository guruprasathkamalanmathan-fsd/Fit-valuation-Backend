'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('variant_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            variant_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            manuf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            model_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            fuel_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            exshowroom_price: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cont_or_disc: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            year: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            transmission: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            drive_type: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            cubic_capacity: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('variant_master');
    }
};