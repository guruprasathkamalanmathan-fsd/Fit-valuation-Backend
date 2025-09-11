'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('inspection_reason_master', {
            uid: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            reason: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            head_id: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            head_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('inspection_reason_master');
    }
};