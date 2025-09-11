'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bodytype_master', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            bodytype_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            bodytype_desc: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bodytype_master');
    }
};