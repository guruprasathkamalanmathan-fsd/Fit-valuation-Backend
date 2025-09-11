'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('variant_master_version', {
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
        await queryInterface.dropTable('variant_master_version');
    }
};