'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('modelmaster_versions', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            manuf_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            model_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            model_desc: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable('modelmaster_versions');
    }
};