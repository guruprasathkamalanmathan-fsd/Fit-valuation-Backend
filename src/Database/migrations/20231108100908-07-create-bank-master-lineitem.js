'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bank_master_lineitem', {
            uid: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            bank_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            process_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            retail: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            repo: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bank_master_lineitem');
    }
};